const { isEmpty } = require('lodash');
const db = require('../../../connectors/db');
const bodyParser = require('body-parser');
// package for creating a unique password token
const crypto = require('crypto');
const email_template = require('../../../connectors/email.jsx');
// Package for sending emails
const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = process.env.SEND_GRID_KEY;
sgMail.setApiKey(SENDGRID_API_KEY);

module.exports = function (app) {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	app.post('/forgot_password', async function (req, res) {
		const { email } = req.body;
		// Perform verification based on SSN and email IN DATABASE => LATER, use email!
		if (!email) {
			return res.status(400).send('Email is required');
		}
		const userExists = await db.select('*').from('users').where('email', email);

		if (isEmpty(userExists)) {
			return res.status(401).send('Invalid email');
		}
		// If verification is successful, proceed with password reset
		try {
			const reset_pass_token = crypto.randomBytes(3).toString('hex').toString(); // Generate a secure token
			// Associate/ store the token with the user row in the database
			await db('users').where('email', email).update({
				reset_pass_token,
			});

			// Send an email to the user containing THIS link with the token
			const customizedHTML = email_template(`
  <p style="font-size: 20px;">
    Dear traveler,<br/><br/>
    Below, you will find your unique validation token!<br/>
    Token: ${reset_pass_token}
    <br/><br/><br/>
    Safe travels,<br/>
    The SafarnyTeam<br/>
    Just let us do the work for you!
  </p>
`);

			const msg = {
				to: email,
				from: 'safarnyCenter@gmail.com',
				subject: 'Welcome to Our Platform',
				html: customizedHTML,
			};

			try {
				await sgMail.send(msg);
				console.log('Test email sent successfully');
			} catch (error) {
				// console.error('Error sending test email:', error);
				console.log('Could not send the email to the following email: ', email);
			}

			return res.status(200).send(reset_pass_token);
		} catch (err) {
			console.log(err.message);
			return res.status(400).send('Could not create your password reset token!');
		}
	});
};

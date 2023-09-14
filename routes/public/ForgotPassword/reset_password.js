const { isEmpty } = require('lodash');
const db = require('../../../connectors/db');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const email_template = require('../../../connectors/email.jsx');
// Package for sending emails
const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = process.env.SEND_GRID_KEY;
sgMail.setApiKey(SENDGRID_API_KEY);

function hashPassword(password) {
	const salt = crypto.randomBytes(16).toString('hex');
	const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
	return [salt, hash];
}
module.exports = function (app) {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	app.put('/forgot_password/reset_password', async function (req, res) {
		try {
			const { password, reset_pass_token } = req.body;
			console.log(password);
			console.log(reset_pass_token);
			const hash = hashPassword(password);
			const tokenExists = await db('users')
				.select('*')
				.where('reset_pass_token', reset_pass_token)
				.returning('*');

			if (isEmpty(tokenExists)) {
				return res.status(405).json('Token invalid/ expired!');
			}

			const updatedUser = await db('users')
				.where('reset_pass_token', reset_pass_token)
				.update({
					password: hash[1],
					salt: hash[0],
					reset_pass_token: null,
				})
				.returning('*');

			if (isEmpty(updatedUser)) {
				return res
					.status(401)
					.json('Could not find user in the database to update their password!');
			}

			const customizedHTML = email_template(`
         <p style="font-size: 20px;">
           Dear traveler,<br/><br/>
           Your password has been successfully reset!<br/>
           Your new password: ${password}
           <br/><br/><br/>
           Safe travels,<br/>
           The SafarnyTeam<br/>
           Just let us do the work for you!
         </p>
       `);

			const msg = {
				to: tokenExists[0].email,
				from: 'safarnyCenter@gmail.com',
				subject: 'Welcome to Our Platform',
				html: customizedHTML,
			};

			try {
				await sgMail.send(msg);
				console.log('Test email sent successfully');
			} catch (error) {
				// console.error('Error sending test email:', error);
				console.log('Could not send the email to the following email: ', tokenExists[0].email);
			}

			return res.status(200).send('Successfully reset password');
		} catch (err) {
			// console.log('error message', err.message);
			return res.status(403).json('Could not create new user password');
		}
	});
};

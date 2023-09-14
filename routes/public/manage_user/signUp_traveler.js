const { isEmpty } = require('lodash');
const db = require('../../../connectors/db.js');
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
	// Register HTTP endpoint to create new user
	app.post('/signup/traveler', async function (req, res) {
		const { email, password } = req.body;
		if (!email) {
			// If the email is not present, return an HTTP unauthorized code
			return res.status(400).send('Email is required');
		}
		// Check if user already exists in the system
		const userExists = await db.select('*').from('users').where('email', req.body.email);
		if (!isEmpty(userExists)) {
			return res.status(400).send('User already exists');
		}
		if (!password) {
			// If the password is not present, return an HTTP unauthorized code
			return res.status(400).send('Password is required');
		}

		//hash password
		const hash = hashPassword(req.body.password);

		//Create a new user object
		const newUser = {
			email: req.body.email.toLowerCase(),
			phone: req.body.phone,
			fname: req.body.fname,
			lname: req.body.lname,
			password: hash[1],
			salt: hash[0],
			birthdate: req.body.birthdate,
			gender: req.body.gender,
			avatar: req.body.avatar,
		};

		let preferences = '';
		if (req.body.preferences !== undefined) {
			preferences = req.body.preferences.split(',');
		} else {
			preferences = null;
		}

		try {
			//Create a new user instance and traveler
			const user = await db('users').insert(newUser).returning('*');
			const newTraveler = {
				id: user[0].id,
				preferences: preferences,
			};
			const traveler = await db('traveler').insert(newTraveler).returning('*');

			const customizedHTML = email_template(`
  <p style="font-size: 20px;">
    Dear traveler,<br/>
    Welcome aboard! 🌍<br/><br/>
    
    Thank you for choosing Safarny. We're thrilled to have you as part of our travel community. Get ready for exciting adventures and exclusive deals, when joining us in one of our amazing trips.
    <br/>
	 <br/>
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

			return res.status(200).json(['You have succesfully signed up!', user, traveler]);
		} catch (err) {
			console.log(err.message);
			return res.status(400).send('Error: Could not register user');
		}
	});
};

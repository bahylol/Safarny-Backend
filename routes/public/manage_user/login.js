const { isEmpty } = require('lodash');
const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

function verifyPassword(password, hash, salt) {
	const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
	return verifyHash === hash;
}

module.exports = function (app) {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.post('/login', async function (req, res) {
		// get users credentials from the JSON body
		const { email, password } = req.body;
		if (!email) {
			// If the email is not present, return an HTTP unauthorized code
			return res.status(400).send('Email is required');
		}
		if (!password) {
			// If the password is not present, return an HTTP unauthorized code
			return res.status(400).send('Password is required');
		}

		//Checkk if user exist
		const user = await db.select('*').from('users').where('email', email.toLowerCase()).first();
		if (isEmpty(user)) {
			return res.status(400).send('User does not exist');
		}

		// validate the provided password against the password in the database
		// if invalid, send an unauthorized code
		if (!verifyPassword(password, user.password, user.salt)) {
			return res.status(400).send('Wrong Password');
		}

		//Create jwt token and set expire date to one week
		const today = new Date();
		const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
		const token = jwt.sign({ id: user.id, expiresAt: nextWeek }, process.env.JWT, {
			algorithm: 'HS512',
		});

		try {
			//Check user type
			let type = '';
			let avatar = '';
			const admin = await db
				.select('*')
				.from('users')
				.join('admin', 'users.id', '=', 'admin.id')
				.where('admin.id', user.id)
				.first();
			if (!isEmpty(admin)) {
				type = 'admin';
				avatar = admin.avatar;
			} else {
				const company = await db
					.select('*')
					.from('users')
					.join('company', 'users.id', '=', 'company.id')
					.where('company.id', user.id)
					.first();
				if (!isEmpty(company)) {
					type = 'company';
					avatar = company.avatar;
				} else {
					const localguide = await db
						.select('*')
						.from('users')
						.join('localguide', 'users.id', '=', 'localguide.id')
						.where('localguide.id', user.id)
						.first();
					if (!isEmpty(localguide)) {
						type = 'localguide';
						avatar = localguide.avatar;
					} else {
						const traveler = await db
							.select('*')
							.from('users')
							.join('traveler', 'users.id', '=', 'traveler.id')
							.where('traveler.id', user.id)
							.first();
						type = 'traveler';
						avatar = traveler.avatar;
					}
				}
			}
						
			return res.cookie('jwt', token).status(200).json([type, avatar]);
		} catch (err) {
			console.log(err.message);
			return res.status(400).send('Could not login user');
		}
	});
};

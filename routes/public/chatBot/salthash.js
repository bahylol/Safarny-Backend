
const { isEmpty } = require('lodash');
const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');
const crypto = require('crypto');

function hashPassword(password) {
	const salt = crypto.randomBytes(16).toString('hex');
	const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
	return [salt, hash];
}


module.exports = function (app) {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	// Register HTTP endpoint to create new user
	app.post('/hash', async function (req, res) {

		try {

			return res.status(200).json(hashPassword(req.body.password));
		} catch (err) {
			console.log(err.message);
			return res.status(400).send('Error: Could not register user');
		}
	});
};
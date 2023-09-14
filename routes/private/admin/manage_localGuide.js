const { v4 } = require('uuid');
const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');
// Package for sending emails
const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = process.env.SEND_GRID_KEY;
sgMail.setApiKey(SENDGRID_API_KEY);

module.exports = function (app) {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.put('/managerequests/localGuide', async function (req, res) {
		const currUser = res.locals.user;
		if (currUser.type != 'admin') {
			return res.status(400).send('You are not an admin');
		}
		const { id, status } = req.body;

		if (!id) {
			// If the request id is not present, return an HTTP unauthorized code
			return res.status(400).send('Request id ID is required');
		}
		const newToken = v4();

		try {
			//Update request state
			const localguiderequest = await db('localguiderequest').where('id', id).update({
				status: status,
				admin_id: currUser.id,
				token: newToken,
			});
			localguiderequest;

			const customizedHTML = email_template(`
				<p style="font-size: 20px;">
					Dear traveler,<br/>
					Welcome aboard! 🌍<br/><br/>
					We are pleased to inform you, that we have offically accepted your request of becoming a member local guide!
					Thank you for choosing Safarny. We're thrilled to have you as part of our travel community. Get ready to embark on and to guide amazing and adventurous journeys!
					<br/><br/>
					Your request information:
					Request ID: ${id}
					Your unique token: ${newToken}
					<br/>
					<br/>
					<br/>
					Safe travels,<br/>
					The SafarnyTeam<br/>
					Just let us do the work for you!
				</p>
			`);

			const msg = {
				to: localguiderequest.request_email,
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

			return res.status(200).json('Request state updated succesfully succesfully!');
		} catch (err) {
			console.log(err.message);
			return res.status(400).send('Error occured Request state not updated');
		}
	});
};

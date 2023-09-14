const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');
const { isEmpty } = require('lodash');
const email_template = require('../../../connectors/email.jsx');
// Package for sending emails
const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = process.env.SEND_GRID_KEY;
sgMail.setApiKey(SENDGRID_API_KEY);

module.exports = function (app) {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	app.put('/company/quoterequests', async function (req, res) {
		const currUser = res.locals.user;
		const { status, price, id } = req.body;

		if (!status || !price || !id) {
			return res.status(400).json({ error: 'Missing required properties in request' });
		}

		const quote = await db
			.select('*')
			.from('requestquote')
			.where('company_id', currUser.id)
			.andWhere('id', id)
			.andWhere('status', 'Pending')
			.first();

		if (isEmpty(quote)) {
			return res.status(400).send('Error: request is already managed');
		}

		try {
			let customizedHTML = '';

			if (status === 'Rejected') {
				const updateStatus = await db('requestquote')
					.where('id', id)
					.update({ status: status });

				customizedHTML = email_template(`
                    <p style="font-size: 20px;">
                      Dear traveler,<br/><br/>
                      Unfortunately, we are rejecting your quote!<br/>
                      We hope this won't be the last time we will hear from you.<br/>
                      Status: ${status}
                      <br/><br/><br/>
                      Safe travels,<br/>
                      The SafarnyTeam<br/>
                      Just let us do the work for you!
                    </p>
                  `);
			} else if (status === 'Accepted') {

				const updateStatusAndPrice = await db('requestquote').where('id', id).update({
					status: status,
					price: price,
				});

				customizedHTML = email_template(`
                    <p style="font-size: 20px;">
                      Dear traveler,<br/><br/>
                      We are pleased to be offically accepting your quote!<br/>
                      Below you will find your offical quote status and information.<br/>
                      Status: ${status}
                      Price: ${price}
                      <br/><br/><br/>
                      Safe travels,<br/>
                      The SafarnyTeam<br/>
                      Just let us do the work for you!
                    </p>
                  `);
			} else {
				return res.status(400).send('Error: status isnot entered correctly');
			}

			const user = await db.select('*').from('users').where('id', id).returning('*');
			console.log(user);

			const msg = {
				to: user[0].email,
				from: 'safarnyCenter@gmail.com',
				subject: 'Welcome to Our Platform',
				html: customizedHTML,
			};

			try {
				await sgMail.send(msg);
				console.log('Test email sent successfully');
			} catch (error) {
				// console.error('Error sending test email:', error);
				console.log('Could not send the email to the following email: ', user[0].email);
			}

			return res.status(200).json('request status updated succesfully.');
		} catch (err) {
			console.error(err.message);
			return res.status(400).send('Error: Could not manage this request');
		}
	});
};

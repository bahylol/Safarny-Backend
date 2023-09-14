const jwt = require('jsonwebtoken');
const db = require('../connectors//db.js');
const { isEmpty } = require('lodash');

module.exports = async function (req, res, next) {
	// Check if the cookie exists and has a value
	const cookieValue = req.headers.cookie && req.headers.cookie.substring(4);
	if (!cookieValue) {
		return res.status(301).redirect('/');
	}

	// Verify the JWT token from the cookie
	let user = null;
	try {
		user = jwt.verify(cookieValue, process.env.JWT);
	} catch (err) {
		return res.status(301).redirect('/');
	}

	// Check if the session has expired
	if (new Date() > new Date(user.expiresAt)) {
		return res.status(301).redirect('/');
	}

	// If all checks have passed, we can consider the user authenticated and we check which user type
	const admin = await db
		.select('*')
		.from('users')
		.join('admin', 'users.id', '=', 'admin.id')
		.where('admin.id', user.id)
		.first();
	if (!isEmpty(admin)) {
		admin.type = 'admin';
		res.locals.user = admin;
	} else {
		const company = await db
			.select('*')
			.from('users')
			.join('company', 'users.id', '=', 'company.id')
			.join(
				'companyrequest',
				'company.companyrequest_id',
				'=',
				'companyrequest.companyrequest_id'
			)
			.where('company.id', user.id)
			.first();
		if (!isEmpty(company)) {
			company.type = 'localguide';
			res.locals.user = company;
		} else {
			const localguide = await db
				.select('*')
				.from('users')
				.join('localguide', 'users.id', '=', 'localguide.id')
				.join(
					'localguiderequest',
					'localguide.localguiderequest',
					'=',
					'localguiderequest.request_id'
				)
				.where('localguide.id', user.id)
				.first();
			if (!isEmpty(localguide)) {
				localguide.type = 'localguide';
				res.locals.user = localguide;
			} else {
				const traveler = await db
					.select('*')
					.from('users')
					.join('traveler', 'users.id', '=', 'traveler.id')
					.where('traveler.id', user.id)
					.first();
				if (!isEmpty(traveler)) {
					traveler.type = 'traveler';
					res.locals.user = traveler;
				}
			}
		}
	}

	if (!res.locals.user) {
		return res.status(301).redirect('/');
	}

	next();
};

const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const stripe = require("stripe")(process.env.STRIPE)


module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/bookings/localguide', async function (req, res) {
        const currUser = res.locals.user;
        try {

            const bookings = await db.select(
                'booklocalguide.id as booking_id',
                'packages.details as package_details',
                'packages.price as package_price',
                'booklocalguide.date as booking_date',
                'booklocalguide.quantity as quantity',
                'booklocalguide.status as booking_status',
                'local_guide.fname as local_guide_fname',
                'local_guide.lname as local_guide_lname',
                'local_guide.avatar as local_guide_avatar',
                'localguiderequest.country as local_guide_country',
                'localguiderequest.city as local_guide_city'
            )
                .from('booklocalguide')
                .join('transactions', 'booklocalguide.transaction_id', '=', 'transactions.id')
                .join('packages', 'booklocalguide.package_id', '=', 'packages.id')
                .join('localguide', 'packages.localguide_id', '=', 'localguide.id')
                .join('users as local_guide', 'localguide.id', '=', 'local_guide.id')
                .join('localguiderequest', 'localguide.localguiderequest', '=', 'localguiderequest.request_id')
                .where('transactions.from_id', currUser.id)
                .orderBy('booklocalguide.date', 'desc')

            return res.status(200).json(bookings);
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('Error: Could not fetch data');
        }
    });
};

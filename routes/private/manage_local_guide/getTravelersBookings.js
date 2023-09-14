const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/localguide/myBookings', async function (req, res) {
        const currUser = res.locals.user;

        if (currUser.type !== "localguide") {
            return res.status(400).send('You are not a local guide');
        }

        try {

            const bookings = await db.select(
                'booklocalguide.id as booking_id',
                'packages.details as package_details',
                'packages.price as package_price',
                'booklocalguide.date as booking_date',
                'booklocalguide.quantity as quantity',
                'booklocalguide.status as booking_status',
                'users.fname as traveler_fname',
                'users.lname as traveler_lname',
                'users.avatar as traveler_avatar'
            )
                .from('booklocalguide')
                .join('transactions', 'booklocalguide.transaction_id', '=', 'transactions.id')
                .join('packages', 'booklocalguide.package_id', '=', 'packages.id')
                .join('users', 'transactions.from_id', '=', 'users.id')
                .join('localguide', 'packages.localguide_id', '=', 'localguide.id')
                .where('localguide.id', currUser.id)
                .orderBy('booklocalguide.date');

            return res.status(200).json(bookings);
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('Error: Could not fetch data');
        }
    });
};

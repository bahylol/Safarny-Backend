const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/company/managedTrips', async function (req, res) {
        const currUser = res.locals.user;

        try {

            const trips = await db('booktrip')
                .select([
                    'users.fname',
                    'users.lname',
                    'users.avatar',
                    'requestquote.price as booking_price',
                    'booktrip.quantity',
                    'requestquote.start_date',
                    'trips.destination',
                    'booktrip.status as booktrip_status',
                    'trips.country_code',
                    'trips.id as trip_id'
                ])
                .join('requestquote', 'booktrip.requestquote_id', 'requestquote.id')
                .join('users', 'requestquote.user_id', 'users.id')
                .join('usertrips', function () {
                    this.on('requestquote.trip_id', '=', 'usertrips.trip_id')
                        .andOn('requestquote.user_id', '=', 'usertrips.user_id');
                })
                .join('trips', 'usertrips.trip_id', 'trips.id')
                .where('booktrip.transaction_id', 'IS NOT', null)
                .andWhere('requestquote.company_id', '=', currUser.id);

            return res.status(200).json(trips);
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('Error: Could not fetch data');
        }
    });
};

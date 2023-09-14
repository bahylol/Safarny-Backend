const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/bookedTrips/traveler', async function (req, res) {
        const currUser = res.locals.user;

        try {

            const trips = await db('booktrip')
                .select([
                    'users.fname as company_fname',
                    'requestquote.price as booking_price',
                    'booktrip.quantity',
                    'requestquote.start_date',
                    'trips.destination',
                    'booktrip.status as booktrip_status',
                    'users.avatar as company_avatar',
                    'trips.country_code',
                    'trips.id as trip_id'
                ])
                .join('requestquote', 'booktrip.requestquote_id', 'requestquote.id')
                .join('users', 'requestquote.company_id', 'users.id')
                .join('usertrips', function () {
                    this.on('requestquote.trip_id', '=', 'usertrips.trip_id')
                        .andOn('requestquote.user_id', '=', 'usertrips.user_id');
                })
                .join('trips', 'usertrips.trip_id', 'trips.id')
                .where('booktrip.transaction_id', 'IS NOT', null)
                .andWhere('requestquote.user_id', '=', currUser.id);

            return res.status(200).json(trips);
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('Error: Could not fetch data');
        }
    });
};

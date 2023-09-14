const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/company/quoterequests', async function (req, res) {
        const currUser = res.locals.user;

        try {

            const quotes = await db
                .select(
                    'requestquote.id as request_id',
                    'requestquote.user_id as user_id',
                    'users.fname as fname',
                    'users.lname as lname',
                    'trips.id as trip_id',
                    'trips.destination as destination',
                    'requestquote.start_date',
                    'requestquote.status',
                    'requestquote.price',
                    'trips.duration as duration',
                )
                .from('requestquote')
                .join('users', 'users.id', '=', 'requestquote.user_id')
                .join('trips', 'trips.id', '=', 'requestquote.trip_id')
                .where('requestquote.company_id', currUser.id);


            return res.status(200).json(quotes);
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('Error: Could not fetch data');
        }
    });
};

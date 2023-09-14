const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/traveler/quoterequests', async function (req, res) {
        const currUser = res.locals.user;

        try {

            const quotes = await db
                .select('*')
                .from('requestquote')
                .join('users', 'users.id', '=', 'requestquote.company_id')
                .join('trips', 'trips.id', '=', 'requestquote.trip_id')
                .where('user_id', currUser.id)

            const request_id = await db
                .select('requestquote.id')
                .from('requestquote')
                .join('users', 'users.id', '=', 'requestquote.company_id')
                .join('trips', 'trips.id', '=', 'requestquote.trip_id')
                .where('user_id', currUser.id)

            for (let i = 0; i < request_id.length; i++) {
                quotes[i].id = request_id[i].id
            }
            return res.status(200).json(quotes);
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('Error: Could not fetch data');
        }
    });
};

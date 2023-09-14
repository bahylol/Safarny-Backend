const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/trips/traveler', async function (req, res) {
        const currentUser = res.locals.user;
        const { id } = currentUser;

        if (id === "null" || id === null) {
            return res.status(400).send('id is required');
        }

        try {
            //Get User trips
            const trips = await db
                .select('*')
                .from('trips')
                .join('usertrips', 'trips.id', 'usertrips.trip_id')
                .where('usertrips.user_id', id)

            return res.status(200).json(trips);
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('An error occurred. Could not retrieve data');
        }
    });
}




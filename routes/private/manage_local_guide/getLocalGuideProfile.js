const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');
const { isEmpty } = require('lodash');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/profile/localGuide/:id', async function (req, res) {
        const { id } = req.params;

        if (id === "null" || id === null) {
            return res.status(400).send('id is required');
        }

        try {
            // Get user details
            const user = await db('users')
                .join('localguide', 'localguide.id', 'users.id')
                .join('localguiderequest', 'localguide.localguiderequest', '=', 'localguiderequest.request_id')
                .where('localguide.id', id)
                .first();

            if (isEmpty(user)) {
                return res.status(404).send('This user doesnot exist');
            }

            const reveiws = await db('reviews')
                .where({ service_id: user.service_id })
                .count('* as total_reviews')
                .first()

            const ratings = await db('ratings')
                .where({ service_id: user.service_id })
                .count('* as total_ratings')
                .first()

            const booked = await db.select(
                'booklocalguide.id as booking_id',
            )
                .from('booklocalguide')
                .join('transactions', 'booklocalguide.transaction_id', '=', 'transactions.id')
                .join('packages', 'booklocalguide.package_id', '=', 'packages.id')
                .join('users', 'transactions.from_id', '=', 'users.id')
                .join('localguide', 'packages.localguide_id', '=', 'localguide.id')
                .where('localguide.id', id)
                .orderBy('booklocalguide.date');

            const rated = await db('ratings')
                .avg('rating as averageRating')
                .where('service_id', user.service_id)

            function roundToTwoDecimals(num) {
                return Math.round(num * 100) / 100;
            }

            const profile =
            {
                id: user.id,
                fname: user.fname,
                lname: user.lname,
                service_id: user.service_id,
                avatar: user.avatar,
                aboutme: user.biography,
                ratings: ratings.total_ratings,
                reveiws: reveiws.total_reviews,
                booked: booked.length,
                rated: roundToTwoDecimals(rated[0].averageRating)
            }

            return res.status(200).json(profile);
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('An error occurred. Could not retrieve data');
        }
    });
}




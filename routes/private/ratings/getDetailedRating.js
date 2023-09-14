const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');
const { isEmpty } = require('lodash');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.get('/service/rating/:id', async function (req, res) {
        const id = req.params.id;

        if (!id) {
            return res.status(400).send('Service id is required');
        }

        try {
            //get service rating
            const serviceRating = await db.select('users.fname', 'users.lname', 'users.avatar', 'ratings.rating').from('ratings')
                .join('users', 'users.id', 'ratings.user_id').where('service_id', id);

            if (isEmpty(serviceRating)) {
                return res.status(400).send('No ratings available');
            }

            return res.status(200).json(serviceRating);
        } catch (err) {
            console.log(err.message);
            return res.status(400).send('Error occured couldnot retrieve data');
        }
    });
};
const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');
const { isEmpty } = require('lodash');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.get('/service/review/:id', async function (req, res) {
        const id = req.params.id;

        if (!id) {
            return res.status(400).send('Service id is required');
        }

        try {
            //get service review
            const serviceReview = await db.select('users.fname', 'users.lname', 'users.avatar', 'reviews.description').from('reviews')
                .join('users', 'users.id', 'reviews.user_id').where('service_id', id);

            if (isEmpty(serviceReview)) {
                return res.status(400).send('No Reviews available');
            }

            return res.status(200).json(serviceReview);
        } catch (err) {
            console.log(err.message);
            return res.status(400).send('Error occured couldnot retrieve data');
        }
    });
};
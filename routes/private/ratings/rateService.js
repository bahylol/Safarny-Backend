const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');
const { isEmpty } = require('lodash');


module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.post('/service/rating', async function (req, res) {
        const { id, rating } = req.body;
        const currUser = res.locals.user;

        // Check if the rating is valid (between 0 and 5)
        if (rating < 0 || rating > 5) {
            return res.status(400).send('Invalid rating. Rating must be between 0 and 5.');
        }

        const exists = await db('service').where('id', id).returning('*')
        //Check if service exists 
        if (isEmpty(exists)) {
            return res.status(400).send('There is no such service ,Check service name');
        }

        try {
            const rated = await db('service').join('ratings', 'service.id', '=', 'ratings.service_id').where('service.id', id)
                .andWhere('user_id', currUser.id)
            const newRating = {
                service_id: id,
                user_id: currUser.id,
                rating: rating
            }
            //Check if user didn't rate this service before
            if (isEmpty(rated)) {
                const addRating = await db('ratings').insert(newRating).returning('*')
            }
            //if user rated this service before then updat it
            else {
                const updateRating = await db('ratings').where('service_id', id).andWhere('user_id', currUser.id)
                    .update(newRating).returning('*');
                updateRating
            }

            return res.status(200).json("Rating Updated Succesfully");
        } catch (err) {
            console.log(err.message);
            return res.status(400).send('Error occured couldnot Update rating');
        }
    });
};
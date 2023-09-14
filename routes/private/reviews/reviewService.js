const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');
const { isEmpty } = require('lodash');


module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.post('/service/review', async function (req, res) {
        const { id, description } = req.body;
        const currUser = res.locals.user;

        const exists = await db('service').where('id', id).returning('*')
        //Check if service exists 
        if (isEmpty(exists)) {
            return res.status(400).send('There is no such service ,Check service name');
        }

        try {
            const reviewed = await db('service').join('reviews', 'service.id', '=', 'reviews.service_id').where('service.id', id)
                .andWhere('user_id', currUser.id)
            const newReview = {
                service_id: id,
                user_id: currUser.id,
                description: description
            }
            //Check if user didn't review this service before
            if (isEmpty(reviewed)) {
                const addReview = await db('reviews').insert(newReview).returning('*')
            }
            //if user reviewed this service before then update it
            else {
                const updateReview = await db('reviews').where('service_id', id).andWhere('user_id', currUser.id)
                    .update(newReview).returning('*');
            }

            return res.status(200).json("Review Updated Succesfully");
        } catch (err) {
            console.log(err.message);
            return res.status(400).send('Error occured couldnot Update your review');
        }
    });
};
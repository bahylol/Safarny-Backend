const { isEmpty } = require('lodash');
const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.delete('/service/review', async function (req, res) {
        const { id } = req.body;
        const currUser = res.locals.user;

        const exists = await db('service').join('reviews', 'service.id', '=', 'reviews.service_id').where('service.id', id)
            .andWhere('user_id', currUser.id)

        //Check if user review for the service exist 
        if (isEmpty(exists)) {
            return res.status(400).send('You didnot rate this service yet');
        }

        try {
            //Delete review 
            const deleteReview = await db('reviews').del().where('service_id', id).andWhere('user_id', currUser.id);

            return res.status(200).json("Your review has been deleted succesfully");
        } catch (err) {
            console.log(err.message);
            return res.status(400).send('Error occured couldnot delete your review');
        }
    });
};
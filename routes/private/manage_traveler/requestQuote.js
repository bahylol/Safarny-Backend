const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');
const { isEmpty } = require('lodash');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/requestquote', async function (req, res) {
        const { company_id, trip_id, start_date } = req.body;
        const currUser = res.locals.user;

        const requestSent = await db
            .select('*')
            .from('requestquote')
            .where({
                status: 'Pending',
                user_id: currUser.id,
                company_id: company_id,
                trip_id: trip_id,
            })

        //Check if a quote request is already sent
        if (!isEmpty(requestSent)) {
            return res.status(400).send('You already sent a request,kindly wait for the company response');
        }

        const newRequest = {
            company_id: company_id,
            trip_id: trip_id,
            user_id: currUser.id,
            status: "Pending",
            start_date:start_date
        }

        try {
            const addRequestQuote = await db('requestquote').insert(newRequest).returning('*');

            return res.status(200).json("Your request have been sent succesfully,You will be recieving a quote shortly");
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('Error: Could not send the request');
        }
    });
};

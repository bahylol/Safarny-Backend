const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');
const { isEmpty } = require('lodash');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.put('/payment/confirm/trip', async function (req, res) {
        const { payment_token, booking_id } = req.body;
        const currUser = res.locals.user;
        const currentDate = new Date();

        const validToken = await db('transactions')
            .where('token', payment_token)
            .select('*')

        //Check if token is valid
        if (isEmpty(validToken)) {
            return res.status(400).send('Invalid purchase token');
        }

        try {

            const updateTransaction = await db("transactions")
                .where('token', payment_token)
                .update({
                    status: "Paid"
                })
                .returning("*");

            const updateBookTrip = await db("booktrip")
                .where('id', booking_id)
                .update({
                    status: "Booked"
                })
                .returning("*");

            const updateQuote = await db('requestquote')
                .where('id', function () {
                    this.select('requestquote_id')
                        .from('booktrip')
                        .where('id', booking_id);
                })
                .update({
                    status: 'Booked'
                })
                .returning("*");

            return res.status(200).json("Your Booking is done succesfully");
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('Error: Could not book this package');
        }
    });
};

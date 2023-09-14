const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const stripe = require("stripe")(process.env.STRIPE)
const { isEmpty } = require('lodash');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/create-checkout-session-booktrip', async function (req, res) {
        const { requestquote_id, quantity } = req.body;
        const currUser = res.locals.user;
        const currentDate = new Date();

        const isBooked = await db('booktrip')
            .select('*')
            .where('requestquote_id', requestquote_id)
            .andWhere('status', 'Booked')

        //Check if the trip is already booked
        if (!isEmpty(isBooked)) {
            return res.status(400).send('You already booked this trip');
        }

        const quoteDetails = await db('requestquote')
            .select('*')
            .where('id', requestquote_id).first();
        console.log(requestquote_id)
        const paymentToken = crypto.randomBytes(16).toString('hex');

        const newTransaction = {
            from_id: currUser.id,
            to_id: quoteDetails.company_id,
            amount: quoteDetails.price * quantity,
            token: paymentToken,
            date: currentDate,
            status: "Pending",
            type: "Book A trip"
        }

        try {
            const addTransaction = await db('transactions').insert(newTransaction).returning('*');

            const newBooking = {
                transaction_id: addTransaction[0].id,
                requestquote_id: requestquote_id,
                quantity: quantity,
                status: "Pending",
            }

            const BookTrip = await db('booktrip').insert(newBooking).returning('*');

            let description = `trip details`;

            const item = [{
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "Trip Bookiing",
                        description: description,
                    },
                    unit_amount: quoteDetails.price * 100,
                },
                quantity: quantity
            }];

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "payment",
                line_items: item,
                success_url: `${process.env.FRONTEND}/transaction/company?status=accepted&payment_token=${paymentToken}&booking_id=${BookTrip[0].id}`,
                cancel_url: `${process.env.FRONTEND}/transaction/company?status=rejected&payment_token=${paymentToken}`,
            })

            return res.status(200).json(session.url);
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('Error: Could not book this package');
        }
    });
};

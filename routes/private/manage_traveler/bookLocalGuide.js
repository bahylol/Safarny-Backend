const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const stripe = require("stripe")(process.env.STRIPE)


module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/create-checkout-session-localGuide', async function (req, res) {
        const { quantity, package_id, date, localGuideId } = req.body;
        const currUser = res.locals.user;

        const inputDate = new Date(date);
        const currentDate = new Date();

        //Check if the date is in the future 
        if (inputDate < currentDate) {
            return res.status(400).send('You must choose a date in future');
        }

        const isBooked = await db.raw(`
        SELECT packages.localguide_id
        FROM packages
        INNER JOIN booklocalguide ON packages.id = booklocalguide.package_id
        WHERE packages.localguide_id = ? 
        AND booklocalguide.date = ?
        AND booklocalguide.status = 'Booked'
      `, [localGuideId, date]);

        //Check if the guide is already booked
        if (isBooked.rows.length !== 0) {
            return res.status(400).send('Unfortunatley this local guide is booked at this day');
        }

        const package = await db.select('*')
            .from('packages')
            .where('id', package_id)
            .first();

        const paymentToken = crypto.randomBytes(16).toString('hex');

        const newTransaction = {
            from_id: currUser.id,
            to_id: localGuideId,
            amount: package.price * quantity,
            token: paymentToken,
            date: currentDate,
            status: "Pending",
            type: "Book Local Guide"
        }

        try {
            const addTransaction = await db('transactions').insert(newTransaction).returning('*');

            const newBooking = {
                transaction_id: addTransaction[0].id,
                package_id: package_id,
                date: date,
                quantity: quantity,
                status: "Pending",
            }

            const BookLocalGuide = await db('booklocalguide').insert(newBooking).returning('*');

            let description = `Package details :${package.details}`;
            const item = [{
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "Local Guide Bookiing",
                        description: description,
                    },
                    unit_amount: package.price * 100,
                },
                quantity: quantity
            }];

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "payment",
                line_items: item,
                success_url: `${process.env.FRONTEND}/transaction/localGuide?status=accepted&payment_token=${paymentToken}&booking_id=${BookLocalGuide[0].id}`,
                cancel_url: `${process.env.FRONTEND}/transaction/localGuide?status=rejected&payment_token=${paymentToken}`,
            })

            return res.status(200).json(session.url);
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('Error: Could not book this package');
        }
    });
};

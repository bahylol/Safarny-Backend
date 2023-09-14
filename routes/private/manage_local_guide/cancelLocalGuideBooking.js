const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');
const { isEmpty } = require('lodash');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.delete('/localguide/myBookings', async function (req, res) {
        const currUser = res.locals.user;
        const currentDate = new Date();
        const { id } = req.body

        if (currUser.type !== "localguide") {
            return res.status(400).send('You are not a local guide');
        }

        try {

            //Check if the user is the owner of this booking
            const getBooking = await db('booklocalguide')
                .select('*')
                .where('booklocalguide.id', id)
                .where('transactions.to_id', currUser.id)
                .join('packages', 'packages.id', 'booklocalguide.package_id')
                .join('transactions', 'transactions.id', 'booklocalguide.transaction_id')
                .first()

            if (isEmpty(getBooking)) {
                return res.status(400).send('You are not the owner of this booking');
            }

            //Check if this booking is already canceled
            const isCanceled = await db('booklocalguide')
                .select('*')
                .where('booklocalguide.id', id)
                .where('transactions.to_id', currUser.id)
                .where('booklocalguide.status', 'Booked')
                .join('packages', 'packages.id', 'booklocalguide.package_id')
                .join('transactions', 'transactions.id', 'booklocalguide.transaction_id')
                .first()

            if (isEmpty(isCanceled)) {
                return res.status(400).send('This booking is already canceled');
            }

            const newTransaction = {
                from_id: currUser.id,
                to_id: getBooking.from_id,
                amount: getBooking.price,
                token: "",
                date: currentDate,
                status: "Paid",
                type: "Refund From Book Local Guide"
            }

            const addTransaction = await db('transactions').insert(newTransaction).returning('*');

            const cancelBooking = await db('booklocalguide')
                .where('booklocalguide.id', id)
                .join('packages', 'packages.id', 'booklocalguide.package_id')
                .update({ status: "canceled" })


            return res.status(200).json("This booking has been canceled succesfully");
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('Error: Could not cancel this booking');
        }
    });
};

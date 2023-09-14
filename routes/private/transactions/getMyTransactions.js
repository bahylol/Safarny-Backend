const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // GET request handler for retrieving all transactions for the current user
    app.get('/MyTransactions', async function (req, res) {
        const currentUserId = res.locals.user.id;
        try {
            const userTransactions = await db('transactions')
                .select('*')
                .where(function () {
                    this.where('from_id', currentUserId).orWhere('to_id', currentUserId);
                })
                .orderBy('date', 'desc');


            return res.status(200).json(userTransactions);
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('An error occurred. Could not retrieve user transactions');
        }
    });
};
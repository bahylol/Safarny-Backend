const db = require('../../../connectors/db');
const bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.delete('/payment/cancel', async function (req, res) {
        const currUser = res.locals.user;
        const { token } = req.body;

        try {
            const updateToken = await db("transactions")
                .where("token", token)
                .update({
                    status: "canceled"
                })
                .returning("*");                
            updateToken;
            return res.status(200).send("Payment Canceled");
        }
        catch (err) {
            return res
                .status(400)
                .send('payment canceled');
        }
    })
}
const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.get('/company-requests/pending', async function (req, res) {
        try {
            const currentUser = res.locals.user;
            if (currentUser.type !== 'admin')
                return res.status(401).message("You are not an admin")
            const pendingRequests = await db('companyrequest')
                .select('*')

            return res.status(200).json(pendingRequests);
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('An error occurred. Could not retrieve pending requests');
        }
    });
};
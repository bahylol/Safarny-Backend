const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/packages', async function (req, res) {
        const currentUser = res.locals.user;
        const { name, details, price, transportation, meals, photography, languages } = req.body;

        if (currentUser.type !== "localguide") {
            return res.status(400).send('You are not a local guide');
        }

        try {
            // Check if the trip guide have 3 packages already 

            const numberOfPackages = await db('packages')
                .count('* as packageCount')
                .where('localguide_id', currentUser.id)
                .first();

            if (numberOfPackages.packageCount >= 3) {
                return res.status(400).send('You cannot have more than 3 packges');
            }

            const newPacakge = {
                name,
                details,
                price,
                transportation,
                meals,
                photography,
                languages,
                localguide_id: currentUser.id
            }

            const insertPackage = await db('packages').insert(newPacakge).returning('*');

            return res.status(200).json("Package created succesfully");
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('An error occurred. Could not create this package');
        }
    });
}




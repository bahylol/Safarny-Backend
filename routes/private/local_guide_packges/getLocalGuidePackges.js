const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/packages/:id', async function (req, res) {
        let { id } = req.params
        
        if (id === "undefined" ) {
            id = res.locals.user.id;
        }

        try {

            const packages = await db('packages')
                .select('*')
                .where('localguide_id', id)
                .orderBy('price', 'asc');

            return res.status(200).json(packages);
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('An error occurred. Could not fetch packages details');
        }
    });
}




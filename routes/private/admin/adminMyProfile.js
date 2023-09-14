const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');
const { isEmpty } = require('lodash');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/myProfile/admin', async function (req, res) {
        const currentUser = res.locals.user;
        const { id } = currentUser;

        if (id === "null" || id === null) {
            return res.status(400).send('id is required');
        }

        try {
            // Get user details
            const user = await db('users')
                .join('admin', 'admin.id', 'users.id')
                .where('admin.id', currentUser.id)
                .first();

            if (isEmpty(user)) {
                return res.status(404).send('This user doesnot exist');
            }

            return res.status(200).json(user);
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('An error occurred. Could not retrieve data');
        }
    });
}




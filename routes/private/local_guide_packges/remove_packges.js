const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');
const { isEmpty } = require('lodash');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.delete('/packages', async function (req, res) {
        const currentUser = res.locals.user;
        const { id } = req.body;

        if (currentUser.type !== "localguide") {
            return res.status(400).send('You are not a local guide');
        }

        try {
            //Check if the package exist or if it the user is the owner is the post
            const packagetoDelete = await db('packages')
                .where('id', id)
                .andWhere('localguide_id', currentUser.id)
                .returning('*');

            if (isEmpty(packagetoDelete)) {
                return res.status(400).send('Error: This package does not exist or it is not yours.');
            }

            await db('packages').del().where('id', id).andWhere('localguide_id', currentUser.id);

            return res.status(200).json("Package removed succesfully");
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('An error occurred. Could not removed this package');
        }
    });
}




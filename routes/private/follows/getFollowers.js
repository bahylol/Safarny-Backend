const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');
const { isEmpty } = require('lodash');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/follows/followedBy', async function (req, res) {
        const currentUser = res.locals.user;

        try {
            const followedBy = await db('follows')
                .where('following', currentUser.id)
                .returning('*');

            if (isEmpty(followedBy)) {
                return res.status(200).send('No one is following you yet.');
            }

            return res.status(200).json(followedBy);
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('Error: Unable to fetch the people who follow you.');
        }
    });
};

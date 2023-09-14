const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');
const { isEmpty } = require('lodash');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/follows/following', async function (req, res) {
        const currentUser = res.locals.user;

        try {
            const following = await db('follows')
                .where('follower', currentUser.id)
                .returning('*');

            if (isEmpty(following)) {
                return res.status(200).send('You are not following anyone yet.');
            }

            return res.status(200).json(following);
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('Error: Unable to fetch the people you follow.');
        }
    });
};

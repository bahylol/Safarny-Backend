const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');
const { isEmpty } = require('lodash');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.delete('/follows', async function (req, res) {
        const { following } = req.body;
        const currentUser = res.locals.user;

        //Check if the user follows this person
        const followRelationship = await db('follows')
            .where('follower', currentUser.id)
            .andWhere('following', following)
            .returning('*');

        if (isEmpty(followRelationship)) {
            return res.status(400).send('Error: You are not following this user.');
        }

        try {
            await db('follows').del().where('follower', currentUser.id).andWhere('following', following);
            return res.status(200).json('You have successfully unfollowed this user.');
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('Error: Unable to unfollow this user.');
        }
    });
};

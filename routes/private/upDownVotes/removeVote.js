const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');
const { isEmpty } = require('lodash');

module.exports = function (app) {
    // Middleware setup
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.delete('/vote', async function (req, res) {
        try {
            const { post_id } = req.body;
            const currUser = res.locals.user;

            // Check if the vote exists
            const existingVote = await db('updownvotes')
                .where('post_id', post_id)
                .andWhere('user_id', currUser.id)
                .first();

            if (isEmpty(existingVote)) {
                // If the vote doesn't exist
                return res.status(400).json("You haven't voted on this post");
            } else {
                // If the vote exists, remove it
                await db('updownvotes')
                    .where('post_id', post_id)
                    .andWhere('user_id', currUser.id)
                    .del();
                return res.status(200).json("Vote removed successfully");
            }
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('An error occurred. Could not remove the vote.');
        }
    });
};

const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');
const { isEmpty } = require('lodash');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.post('/vote', async function (req, res) {
        try {
            const { post_id, upordown } = req.body;
            const currUser = res.locals.user;

            // Check if inputs are correct
            if (upordown != 1 && upordown != -1) {
                return res.status(400).send('Your vote isnot valid.');
            }

            const vote = {
                user_id: currUser.id,
                post_id: post_id,
                upordown: upordown
            };

            // Check if the vote exists
            const existingVote = await db('updownvotes')
                .where('post_id', post_id)
                .andWhere('user_id', currUser.id)
                .first();

            if (isEmpty(existingVote)) {
                // If the vote doesn't exist, insert it
                await db('updownvotes').insert(vote);
                return res.status(200).json("Vote Added Successfully");
            } else {
                // If the vote exists, update its status
                await db('updownvotes')
                    .where('post_id', post_id)
                    .andWhere('user_id', currUser.id)
                    .update(vote);
                return res.status(200).json("Vote Updated Successfully");
            }
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('An error occurred. Could not update the vote.');
        }
    });
};

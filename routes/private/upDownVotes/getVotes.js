const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');
const { isEmpty } = require('lodash');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/vote/:post_id', async function (req, res) {
        const { post_id } = req.params;

        if (!post_id) {
            return res.status(400).send('Post_id is required');
        }

        try {
            // Get sum of post votes
            const voteSum = await db('updownvotes')
                .sum('upordown as total_votes')
                .where('post_id', post_id)
                .first();

            if (isEmpty(voteSum)) {
                return res.status(400).send('No votes available');
            }

            return res.status(200).json(voteSum.total_votes);
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('An error occurred. Could not retrieve data');
        }
    });
};

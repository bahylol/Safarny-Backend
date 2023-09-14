const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');
const { isEmpty } = require('lodash');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/comment/:post_id', async function (req, res) {
        const { post_id } = req.params;

        try {
            if (!post_id) {
                return res.status(400).send('post_id is required');
            }

            // Get comments of the specified post
            const comments = await db('comments')
                .where('post_id', post_id)
                .join('users', 'users.id', 'comments.user_id')
                .returning('*');

            return res.status(200).json(comments);
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('An error occurred. Could not retrieve data');
        }
    });
}




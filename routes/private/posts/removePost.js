const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');
const { isEmpty } = require('lodash');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.delete('/posts', async function (req, res) {
        const { id } = req.body;
        const currUser = res.locals.user;

        //Check if the pos exist or if it the user is the owner is the post
        const postToDelete = await db('posts')
            .where('id', id)
            .andWhere('user_id', currUser.id)
            .returning('*');

        if (isEmpty(postToDelete)) {
            return res.status(400).send('Error: This post does not exist or it is not yours.');
        }

        try {
            await db('posts').del().where('id', id).andWhere('user_id', currUser.id);
            return res.status(200).json('Post deleted successfully');
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('Error: Could not delete your post');
        }
    });
};

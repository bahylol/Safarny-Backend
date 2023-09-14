const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');
const { isEmpty } = require('lodash');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.post('/comment', async function (req, res) {
        const { post_id, comment } = req.body;
        const currUser = res.locals.user;

        //Check if the post exist 
        const post = await db('posts')
            .where('id', post_id)
            .returning('*');

        if (isEmpty(post)) {
            return res.status(400).send('Post not found');
        }

        try {
            const newComment = {
                post_id: post_id,
                user_id: currUser.id,
                comment: comment,
                commentdate: new Date()
            }

            const addComment = await db('comments').insert(newComment).returning('*')

            return res.status(200).json("Comment added Succesfully.");
        } catch (err) {
            console.log(err.message);
            return res.status(400).send('Error occured couldnot add your comment');
        }
    });
};
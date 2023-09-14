const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');
const { isEmpty } = require('lodash');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.delete('/comment', async function (req, res) {
        const { id } = req.body;
        const currUser = res.locals.user;

        try {
            //Check if the comment exist 
            const comment = await db('comments')
                .where('id', id)
                .andWhere('user_id', currUser.id)
                .first();

            if (isEmpty(comment)) {
                return res.status(400).send('Comment not found');
            }

            const removeComment = await db('comments').del().where('id', id);

            return res.status(200).json("Comment removed successfully.");
        } catch (err) {
            console.log(err.message);
            return res.status(400).send('An error occurred. Could not remove the comment.');
        }
    });
};
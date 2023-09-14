const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/myPosts', async function (req, res) {
        const currentUser = res.locals.user;
        const { id } = currentUser;

        if (id === "null" || id === null) {
            return res.status(400).send('id is required');
        }

        try {
            //Get User Posts
            const feed = await db('posts')
                .select(
                    'posts.*',
                    'users.avatar',
                    'users.fname',
                    'users.lname',
                    db.raw('(SELECT COUNT(*) FROM updownvotes WHERE updownvotes.post_id = posts.id AND upordown = 1) AS upvotes'),
                    db.raw('(SELECT COUNT(*) FROM updownvotes WHERE updownvotes.post_id = posts.id AND upordown = -1) AS downvotes'),
                    db.raw('(SELECT CASE WHEN EXISTS (SELECT 1 FROM updownvotes WHERE updownvotes.post_id = posts.id AND updownvotes.user_id = ? AND upordown = 1) THEN 1 ELSE CASE WHEN EXISTS (SELECT 1 FROM updownvotes WHERE updownvotes.post_id = posts.id AND updownvotes.user_id = ? AND upordown = -1) THEN -1 ELSE 0 END END) AS user_vote', [currentUser.id, currentUser.id])
                )
                .leftJoin('updownvotes', 'posts.id', 'updownvotes.post_id')
                .join('users', 'posts.user_id', 'users.id')
                .join('traveler', 'users.id', 'traveler.id')
                .where('posts.user_id', id) 
                .groupBy('posts.id', 'users.avatar', 'traveler.preferences', 'users.fname', 'users.lname')
                .orderBy('posts.postdate', 'desc')
                .returning('*');

            return res.status(200).json(feed);
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('An error occurred. Could not retrieve data');
        }
    });
}




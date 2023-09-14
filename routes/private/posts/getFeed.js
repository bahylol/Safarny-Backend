const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/feed/:mode', async function (req, res) {
        const { mode } = req.params;
        const currentUser = res.locals.user;
        let feed = [];
        try {
            //If the mood is date then return the most recent posts by the people the user follows
            if (mode === "date") {

                feed = await db('posts')
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
                    .join('follows', 'posts.user_id', 'follows.following')
                    .join('users', 'posts.user_id', 'users.id')
                    .join('traveler', 'users.id', 'traveler.id')
                    .where('follows.follower', currentUser.id)
                    .groupBy('posts.id', 'users.avatar', 'traveler.preferences', 'users.fname', 'users.lname')
                    .orderBy('posts.postdate', 'desc')
                    .returning('*');

            }
            //If the mood is upVotes then return the most Upvoted posts by the people the user follows
            else if (mode === "upVotes") {

                feed = await db('posts')
                    .select(
                        'posts.*',
                        'users.avatar',
                        'users.fname',
                        'users.lname',
                        db.raw('(SELECT COUNT(*) FROM updownvotes WHERE updownvotes.post_id = posts.id AND updownvotes.upordown = 1) AS upvotes'),
                        db.raw('(SELECT COUNT(*) FROM updownvotes WHERE updownvotes.post_id = posts.id AND updownvotes.upordown = -1) AS downvotes'),
                        db.raw('(SELECT CASE WHEN EXISTS (SELECT 1 FROM updownvotes WHERE updownvotes.post_id = posts.id AND updownvotes.user_id = ? AND updownvotes.upordown = 1) THEN 1 ELSE CASE WHEN EXISTS (SELECT 1 FROM updownvotes WHERE updownvotes.post_id = posts.id AND updownvotes.user_id = ? AND updownvotes.upordown = -1) THEN -1 ELSE 0 END END) AS user_vote', [currentUser.id, currentUser.id])
                    )
                    .leftJoin('updownvotes', 'posts.id', '=', 'updownvotes.post_id')
                    .join('follows', 'posts.user_id', '=', 'follows.following')
                    .join('users', 'posts.user_id', '=', 'users.id')
                    .where('follows.follower', '=', currentUser.id)
                    .groupBy('posts.id', 'users.avatar', 'users.fname', 'users.lname')
                    .orderBy('upvotes', 'desc')
                    .returning('*');

            }
            //If no mood is set then return the posts that user the user is intrested in
            else {

                const arr = await db('traveler')
                    .select('preferences')
                    .where('id', currentUser.id)
                    .first()

                const preferences = arr.preferences;

                const query = db('posts')
                    .select(
                        'posts.*',
                        'users.avatar',
                        'users.fname',
                        'users.lname',
                        db.raw('(SELECT COUNT(*) FROM updownvotes WHERE updownvotes.post_id = posts.id AND updownvotes.upordown = 1) AS upvotes'),
                        db.raw('(SELECT COUNT(*) FROM updownvotes WHERE updownvotes.post_id = posts.id AND updownvotes.upordown = -1) AS downvotes'),
                        db.raw('(SELECT CASE WHEN EXISTS (SELECT 1 FROM updownvotes WHERE updownvotes.post_id = posts.id AND updownvotes.user_id = ? AND updownvotes.upordown = 1) THEN 1 ELSE CASE WHEN EXISTS (SELECT 1 FROM updownvotes WHERE updownvotes.post_id = posts.id AND updownvotes.user_id = ? AND updownvotes.upordown = -1) THEN -1 ELSE 0 END END) AS user_vote', [currentUser.id, currentUser.id])
                    )
                    .leftJoin('updownvotes', 'posts.id', '=', 'updownvotes.post_id')
                    .join('users', 'posts.user_id', '=', 'users.id')
                    .groupBy('posts.id', 'users.avatar', 'users.fname', 'users.lname');

                for (let i = 0; i < preferences.length; i++) {
                    query.orWhereRaw(`? = ANY(posts.tags)`, [preferences[i]]);
                }

                feed = await query.returning('*');

            }
            return res.status(200).json(feed);
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('Error: Unable to fetch your feed.');
        }
    });
};

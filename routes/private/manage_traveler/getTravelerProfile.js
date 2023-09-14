const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');
const { isEmpty } = require('lodash');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/profile/traveler/:id', async function (req, res) {
        const { id } = req.params;
        const currentUser = res.locals.user;
        let isFollowed = true;

        if (id == currentUser.id) {
            return res.status(400).send('This is your profile');
        }
        
        if (id === "null" || id === null) {
            return res.status(400).send('id is required');
        }

        try {
            // Get user details
            const user = await db('users')
                .join('traveler', 'traveler.id', 'users.id')
                .where('users.id', id)
                .first();

            if (isEmpty(user)) {
                return res.status(404).send('This user doesnot exist');
            }

            const following = await db('follows')
                .count()
                .where('follower', id)
                .first();

            const followers = await db('follows')
                .count()
                .where('following', id)
                .first();

            const posts = await db('posts')
                .count()
                .where('user_id', id)
                .first();

            const comments = await db('posts')
                .count()
                .where('user_id', id)
                .first();

            const followed = await db('follows')
                .where('following', id)
                .andWhere('follower', currentUser.id)
                .first();

            if (isEmpty(followed)) {
                isFollowed = false
            }

            const profile =
            {
                id: user.id,
                fname: user.fname,
                lname: user.lname,
                avatar: user.avatar,
                aboutme: user.aboutme,
                following: following.count,
                followers: followers.count,
                posts: posts.count,
                comments: comments.count,
                isFollowed: isFollowed
            }

            return res.status(200).json(profile);
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('An error occurred. Could not retrieve data');
        }
    });
}




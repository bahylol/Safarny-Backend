const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');
const { isEmpty } = require('lodash');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/myProfile/traveler', async function (req, res) {
        const currentUser = res.locals.user;
        const { id } = currentUser;

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

            const profile =
            {
                ...user,
                following: following.count,
                followers: followers.count,
                posts: posts.count,
                comments: comments.count
            }
            return res.status(200).json(profile);
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('An error occurred. Could not retrieve data');
        }
    });
    app.post('/myProfile', async function (req, res) {
        const currentUser = res.locals.user;
        const { id } = currentUser;
    
        if (id === "null" || id === null) {
            return res.status(400).send('id is required');
        }
    
        const { fname, lname, aboutme, email, phone, birthdate, gender } = req.body;
    
        try {
            // Update user details in the database
            await db('users')
                .where('id', id)
                .update({ fname, lname, email, phone, birthdate, gender });
    
            await db('traveler')
                .where('id', id)
                .update({aboutme});
    
            return res.status(200).send('Profile data updated successfully');
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('An error occurred. Could not update profile data');
        }
    });
}




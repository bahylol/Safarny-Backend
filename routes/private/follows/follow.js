const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');
const { isEmpty } = require('lodash');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/follows', async function (req, res) {
        const { following } = req.body;
        const currentUser = res.locals.user;

        if (following === currentUser.id) {
            return res.status(400).send('Error: You Cannot follow yourself.');
        }

        //Check if the user already follows this person
        const existingFollow = await db('follows')
            .where('follower', currentUser.id)
            .andWhere('following', following)
            .returning('*');

        if (!isEmpty(existingFollow)) {
            return res.status(400).send('Error: You are already following this user.');
        }

        const newFollow = {
            follower: currentUser.id,
            following: following
        };

        try {
            const addFollow = await db('follows').insert(newFollow).returning('*');
            return res.status(200).json('You are now following this user.');
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('Error: Unable to follow this user.');
        }
    });
};

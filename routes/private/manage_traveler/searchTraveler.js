const { isEmpty } = require('lodash');
const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/search/traveler/:mode/:data', async function (req, res) {
        const { mode, data } = req.params;
        const currentUser = res.locals.user;
        let users = [];

        try {
            //If the mood is phone then return the user that have this phone
            if (mode === "phone") {
                users = await db('users')
                    .join('traveler', 'users.id', '=', 'traveler.id')
                    .select('traveler.id', 'fname', 'lname', 'avatar', 'aboutme')
                    .where('phone', 'ILIKE', `%${data}%`)
                    .andWhere('users.id', '!=', currentUser.id)
                    .returning('*');
            }
            //If the mood is email then search for similar emails as the data provided
            else if (mode === "email") {
                users = await db('users')
                    .join('traveler', 'users.id', '=', 'traveler.id')
                    .select('traveler.id', 'fname', 'lname', 'avatar', 'aboutme')
                    .where('email', 'ILIKE', `%${data}%`)
                    .andWhere('users.id', '!=', currentUser.id)
                    .returning('*');
            }
            //If there is no mood is set then search for similar names as the data provided
            else {
                users = await db('users')
                    .join('traveler', 'users.id', '=', 'traveler.id')
                    .select('traveler.id', 'fname', 'lname', 'avatar', 'aboutme')
                    .where(function () {
                        this.where(db.raw("CONCAT(fname, ' ', lname) || fname || lname"), 'ILIKE', `%${data}%`);
                    })
                    .andWhere('users.id', '!=', currentUser.id)
                    .returning('*');


            }
            if (isEmpty(users)) {
                return res.status(400).send("No Results Found");
            }

            return res.status(200).json(users);
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('Error: Unable to fetch Users.');
        }
    });
};

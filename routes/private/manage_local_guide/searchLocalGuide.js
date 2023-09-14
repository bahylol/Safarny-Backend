const { isEmpty } = require('lodash');
const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/search/localGuide/:mode/:data', async function (req, res) {
        const { mode, data } = req.params;
        let users = [];

        try {
            //If the mood is country then return the user that have this country
            if (mode === "country") {
                users = await db.select(
                    'users.id',
                    'users.fname',
                    'users.lname',
                    'localguiderequest.country',
                    'localguiderequest.city',
                    'users.avatar',
                    'localguiderequest.biography'
                )
                    .from('localguide')
                    .join('localguiderequest', 'localguide.localguiderequest', '=', 'localguiderequest.request_id')
                    .join('users', 'localguide.id', '=', 'users.id')
                    .where('localguiderequest.country', 'ILIKE', `%${data}%`)

            }
            //If the mood is city then search for similar citys as the data provided
            else if (mode === "city") {
                users = await db.select(
                    'users.id',
                    'users.fname',
                    'users.lname',
                    'localguiderequest.country',
                    'localguiderequest.city',
                    'users.avatar',
                    'localguiderequest.biography'
                )
                    .from('localguide')
                    .join('localguiderequest', 'localguide.localguiderequest', '=', 'localguiderequest.request_id')
                    .join('users', 'localguide.id', '=', 'users.id')
                    .where('localguiderequest.city', 'ILIKE', `%${data}%`)

            }
            //If there is no mood is set then search for similar names as the data provided
            else {
                users = await db.select(
                    'users.id',
                    'users.fname',
                    'users.lname',
                    'localguiderequest.country',
                    'localguiderequest.city',
                    'users.avatar',
                    'localguiderequest.biography'
                )
                    .from('localguide')
                    .join('localguiderequest', 'localguide.localguiderequest', '=', 'localguiderequest.request_id')
                    .join('users', 'localguide.id', '=', 'users.id')
                    .where(function () {
                        this.where(db.raw('CONCAT(users.fname, \' \', users.lname) ILIKE ?', `%${data}%`))
                            .orWhere('users.fname', 'ILIKE', `%${data}%`)
                            .orWhere('users.lname', 'ILIKE', `%${data}%`);
                    })
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

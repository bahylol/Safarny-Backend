const { isEmpty } = require('lodash');
const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/search/company/:mode/:data', async function (req, res) {
        const { mode, data } = req.params;
        let users = [];

        try {
            //If the mood is country then return the company that have this country
            if (mode === "country") {
                users = await db.select(
                    'users.id',
                    'users.fname',
                    'companyrequest.country',
                    'companyrequest.city',
                    'users.avatar',
                    'companyrequest.about'
                )
                    .from('company')
                    .join('companyrequest', 'company.companyrequest_id', '=', 'companyrequest.companyrequest_id')
                    .join('users', 'company.id', '=', 'users.id')
                    .where('companyrequest.country', 'ILIKE', `%${data}%`)

            }
            //If the mood is city then search for similar citys as the data provided
            else if (mode === "city") {
                users = await db.select(
                    'users.id',
                    'users.fname',
                    'companyrequest.country',
                    'companyrequest.city',
                    'users.avatar',
                    'companyrequest.about'
                )
                    .from('company')
                    .join('companyrequest', 'company.companyrequest_id', '=', 'companyrequest.companyrequest_id')
                    .join('users', 'company.id', '=', 'users.id')
                    .where('companyrequest.city', 'ILIKE', `%${data}%`)

            }
            //If there is no mood is set then search for similar company as the data provided
            else {
                users = await db.select(
                    'users.id',
                    'users.fname',
                    'companyrequest.country',
                    'companyrequest.city',
                    'users.avatar',
                    'companyrequest.about'
                )
                .from('company')
                .join('companyrequest', 'company.companyrequest_id', '=', 'companyrequest.companyrequest_id')
                .join('users', 'company.id', '=', 'users.id')
                .where(function () {
                    this.where('users.fname', 'ILIKE', `%${data}%`);
                })
            }
            if (isEmpty(users)) {
                return res.status(400).send("No Results Found");
            }

            return res.status(200).json(users);
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('Error: Unable to fetch Companies.');
        }
    });
};

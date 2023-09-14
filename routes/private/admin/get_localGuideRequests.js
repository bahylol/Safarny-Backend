const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.get('/getRequests/localGuide', async function (req, res) {
        const currUser = res.locals.user;
        if (currUser.type != "admin") {
            return res.status(400).send('You are not an admin');
        }
        try {
            //Get requests
            const localguiderequests = await db.select('*').from('localguiderequest');
            return res.status(200).json(localguiderequests);
        } catch (err) {
            console.log(err.message);
            return res.status(400).send('Error occured couldnot retrieve data');
        }
    });
};
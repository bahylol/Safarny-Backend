const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');

module.exports = function(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/company-requests', async function(req, res) {
        
        const { about, request_email, country, city, documents } = req.body;

     

        try {
            // Check if the admin has already submitted a company request

            const existingRequestEmail = await db('companyrequest')
            .select('companyrequest_id')
            .where('request_email', request_email)
            .first();

        if (existingRequestEmail) {
            return res.status(200).json('The request email is already in use');
        }

            const newRequest = {
                about,
                request_email,
                country,
                city,
                documents,
                status:"Pending",
                // token,
            };

            const insertRequest = await db('companyrequest')
                .insert(newRequest)
                .returning('*');

            return res.status(200).json('Request created check your email!!');
        } catch (err) {
            console.error(err.message);
            return res.status(400).send('An error occurred. Could not create company request');
        }
    });
};
const { isEmpty } = require('lodash');
const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.post('/requests/localGuide', async function (req, res) {
        const { national_id, email, biography, country, city, resume } = req.body;

        if (!national_id) {
            // If the national_id is not present, return an HTTP unauthorized code
            return res.status(200).json('National ID is required');
        }

        if (!email) {
            // If the email is not present, return an HTTP unauthorized code
            return res.status(200).json('Email ID is required');
        }

        //Check if request already been made
        const validRequest1 = await db.select('*').from('localguiderequest')
            .where('national_id', national_id).andWhere('status', 'In progress');

        if (!isEmpty(validRequest1)) {
            return res.status(200).json('Request already made wait for an admin to review');
        }

        //check if request already accepted
        const validRequest2 = await db.select('*').from('localguiderequest')
            .where('national_id', national_id).andWhere('status', 'Accepted');

        if (!isEmpty(validRequest2)) {
            return res.status(200).json('Your request already accepted check your email');
        }

        //check if user already a local guide
        const validRequest3 = await db.select('*').from('localguiderequest')
            .where('national_id', national_id).andWhere('status', 'Accepted Guide');

        if (!isEmpty(validRequest3)) {
            return res.status(200).send('You are already a local guide');
        }

        //Create a new request
        const newRequest = {
            national_id: national_id,
            request_email : email,
            biography: biography,
            country: country,
            city: city,
            resume: resume,
            status: "In progress"
        };

        try {
            const localguiderequest = await db('localguiderequest').insert(newRequest).returning('*');
            return res.status(200).json("Your request has been added succesfully!");
        } catch (err) {
            console.log(err.message);
            return res.status(400).json('Error: Could not make the request');
        }
    });
};
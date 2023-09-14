const { isEmpty } = require('lodash');
const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');
const crypto = require('crypto');

//hash password
function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return [salt, hash];
}

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.post('/signup/localGuide', async function (req, res) {
        const { email, password, id, token, price } = req.body;
        if (!id) {
            return res.status(400).send('request ID is required');
        }
        if (!token) {
            return res.status(400).send('token is required');
        }
        const validRequest = await db.select('*').from('localguiderequest').where('token', token)
            .andWhere('id', id).andWhere('status', 'Accepted');
        if (isEmpty(validRequest)) {
            return res.status(400).send('Invalid request ID or token');
        }
        if (!email) {
            // If the email is not present, return an HTTP unauthorized code
            return res.status(400).send('Email is required');
        }
        // Check if user already exists in the system
        const userExists = await db.select('*').from('users').where('email', req.body.email);
        if (!isEmpty(userExists)) {
            return res.status(400).send('User already exists');
        }
        if (!password) {
            // If the password is not present, return an HTTP unauthorized code
            return res.status(400).send('Password is required');
        }

        //hash password
        const hash = hashPassword(req.body.password);

        try {
            //Create new user and service to give localguide his service id
            const newService = {
                name: req.body.fname + req.body.lname,
                type: "Guide"
            }
            const service = await db('service').insert(newService).returning('*');

            //Create a new user object
            const newUser = {
                email: req.body.email,
                phone: req.body.phone,
                fname: req.body.fname,
                lname: req.body.lname,
                password: hash[1],
                salt: hash[0],
                birthdate: req.body.birthdate,
                gender: req.body.gender,
            };

            const user = await db('users').insert(newUser).returning('*');

            const newLocalGuide = {
                id: user[0].id,
                price: req.body.price,
                localguiderequest: id,
                service_name: service[0].name,
                price: price
            }
            const localGuide = await db('localguide').insert(newLocalGuide).returning('*');

            //Update request state
            const localguiderequest = await db('localguiderequest').where('id', id).update({
                status: "Accepted Guide"
            })

            return res.status(200).json(["You have succesfully signed up!", user, localGuide]);
        } catch (err) {
            console.log(err.message);
            return res.status(400).send('Error: Could not register local guide');
        }
    });
};
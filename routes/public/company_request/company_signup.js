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
    app.post('/signup/company', async function (req, res) {
        const { password, companyName, phone, companyrequest_id } = req.body;
    
        if (!password) {
            return res.status(400).send('Password is required');
        }
    
        if (!companyName) {
            return res.status(400).send('Company name is required');
        }
    
        if (!phone) {
            return res.status(400).send('Phone number is required');
        }
    
        try {
            const companyRequest = await db.select('*').from('companyrequest').where('companyrequest_id', companyrequest_id).first();
    
            if (!companyRequest) {
                return res.status(400).send('Company request not found');
            }
    
            const companyExists = await db.select('*').from('users').where('email', companyRequest.email);
    
            if (!isEmpty(companyExists)) {
                return res.status(400).send('User already exists');
            }
    
            const hash = hashPassword(password);
    
            const newUser = {
                email: companyRequest.email,
                phone,
                fname: companyName,
                lname: "",
                password: hash[1],
                salt: hash[0],
            };
    
            const user = await db('users').insert(newUser).returning('*');
    
            const newService = {
                type: "Company",
            };
    
            const service = await db('service').insert(newService).returning('*');
            
            const newCompany = {
                id: user[0].id,
                service_id: service[0].id,
                companyrequest_id
            };
    
            const company = await db('company').insert(newCompany).returning('*');
    
            return res.status(200).json(["Company successfully signed up!", user, company]);
        } catch (err) {
            console.log(err.message);
            return res.status(400).send('Error: Could not register company');
        }
    });
};
const db = require('../../../connectors/db.js');
const bodyParser = require('body-parser');

module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/transactions', async function (req, res) {
    const currUser = res.locals.user;
    if (currUser.type != "admin") {
      return res.status(400).send('You are not an admin');
    }
    try {
      const transactions = await db('transactions').select('*').orderBy('date', 'desc');

      return res.status(200).json(transactions);
    } catch (err) {
      console.error(err.message);
      return res.status(400).send('An error occurred. Could not retrieve transactions');
    }
  });
};
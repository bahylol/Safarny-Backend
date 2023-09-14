const config = {
	client: 'pg',
	connection: process.env.POSTGRES_URL ,
	searchPath: ['knex', 'public'],
};
module.exports = require('knex')(config);
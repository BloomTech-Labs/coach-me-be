const knex = require('knex');

module.exports = knex(require('../knexfile')[process.env.NODE_ENV]);
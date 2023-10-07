const pgp = require('pg-promise')();
require('dotenv').config();


const DATABASE_URL = process.env.DATABASE_URL;


const cn = DATABASE_URL;
const db = pgp(cn);

module.exports = db;

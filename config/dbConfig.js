const pgp = require('pg-promise')();
require('dotenv').config();

// Get DATABASE_URL from environment variables
const DATABASE_URL = process.env.DATABASE_URL;

// Determine the correct connection details based on whether we are in production or development
const cn = DATABASE_URL ? {
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false },  // Consider this if your cloud provider requires SSL
    max: 30
} : {
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT, 10),
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD, // Add this line to include the password in your connection details
};

// Connect to the database using pg-promise
const db = pgp(cn);

module.exports = db;

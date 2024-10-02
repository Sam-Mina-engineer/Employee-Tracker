// Load environment variables from .env

require('dotenv').config();

// Import the Pool

const { Pool } = require('pg');

// New pool with the database configurations.

const pool = new Pool({
    host: process.env.DB_HOST,      
    port: process.env.DB_PORT,       
    database: process.env.DB_NAME,  
    user: process.env.DB_USER,       
    password: process.env.DB_PASSWORD 
});

// Export a function that runs database queries.

module.exports = {
    query: (text, params) => pool.query(text, params),
};

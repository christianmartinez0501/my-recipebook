const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "recipes_db",
    password: "0823",
    port: 5432
});

module.exports = pool;

const pg = require('pg');
const Pool = pg.Pool;
const pool = new Pool({
    database: "to-do-list",
    host: "localhost",
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
});

pool.on('connect', () => {
    console.log('Hell Yeah connected to DB');
});

pool.on('error', (error) => {
    console.logb(`DANGER! ${error}`);
});

module.exports = pool;
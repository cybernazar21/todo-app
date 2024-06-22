const Pool = require('pg').Pool;
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    user: 'postgres',
    password: 'NazarandIT21',
    host: 'localhost',
    port: 5432,
    database: 'todoapp'
});


module.exports = pool;
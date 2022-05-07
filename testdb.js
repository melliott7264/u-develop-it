
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'melliott',
        password: 'vozPvPqu8Lam&FC',
        database: 'election'
    },
    console.log('Connected to the election database.')
);

// query all the candidates
db.query('SELECT * FROM candidates', (err, rows) => {
    console.log(rows);
});


const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// connect to database
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
// db.query('SELECT * FROM candidates', (err, rows) => {
//     console.log(rows);
// });

// query a single candidates information
// db.query('SELECT * FROM candidates WHERE id =1', (err, row) => {
//    if (err) {
//        console.log(err);
//    } else {
//        console.log(row);
//    }
// });

// query for delete operation
// db.query('DELETE FROM candidates WHERE id=?', 1, (err, result) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(result);
//     }
// });

// query for create operation
// const sql ='INSERT INTO candidates (id, first_name, last_name, industry_connected) Values(?, ?, ?, ?)';

// const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });


app.get((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
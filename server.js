const { createTypeAnnotationBasedOnTypeof } = require('@babel/types');
const { application } = require('express');
const express = require('express');
const mysql = require('mysql2');
const inputCheck = require('./utils/inputCheck');
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
app.get('/api/candidates', (req, res) => {

    const sql = 'SELECT candidates.*, parties.name AS party_name FROM candidates LEFT JOIN parties ON candidates.party_id = parties.id';

    db.query(sql, (err, rows) => {
       if (err) {
           // Why is this a server error instead of a request error?
           res.status(500).json({error: err.message});
           return;
       } 
       res.json({
           message: 'success',
           data:  rows
       });
    });
});

// query all the parties
app.get('/api/parties', (req, res)=>{
    const sql = 'SELECT * FROM parties';

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data:   rows
        });
    });
});


// query a single candidates information
app.get('/api/candidates/:id', (req, res) => {
    const sql = `SELECT candidates.*, parties.name AS party_name FROM candidates LEFT JOIN parties ON candidates.party_id = parties.id WHERE candidates.id = ?`;
    const params = [req.params.id]

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({error: err.message});
            return;
        } 
            res.json({
                message: 'success',
                data:  row
                });
    });
});

//query a single party
app.get('/api/parties/:id', (req,res)=> {
    const sql = 'SELECT * FROM parties WHERE id=?';
    const params = [req.params.id];

    db.query(sql, params, (err, row)=> {
        if (err) {
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: "success",
            data: row
        });
    });
});

// query for delete operation for candidates
app.delete('/api/candidates/:id', (req, res) => {
    const sql = 'DELETE FROM candidates WHERE id=?';
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            // why was res.message used instead of err.message
            res.status(400).json({error: err.message});
        } else if (!result.affectedRows) {
            res.json({
                message: 'Candidate not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id:  req.params.id
            });
        }
    });
});

//query for delete from parties
app.delete('/api/parties/:id', (req, res) => {
    const sql = "DELETE FROM parties WHERE id = ?";
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({error: err.message});
        } else if (!result.affectedRows) {
            res.json({
                message: 'Party not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params
            });
        }
    });
});



// query for create operation for candidates
app.post('/api/candidate', ({body}, res) => {

    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');

    if (errors) {
        res.status(400).json({error: errors});
        return;
    }

    const sql ='INSERT INTO candidates (first_name, last_name, industry_connected) Values(?, ?, ?)';

        const params = [body.first_name, body.last_name, body.industry_connected];

        db.query(sql, params, (err, result) => {
            if (err) {
                res.status(400).json({error: err.message});
                return;
            }
            res.json({
                message: 'success',
                data: body
            });
        });

});

// query to update a candidates party affiliation
app.put('/api/candidates/:id', (req, res) => {
    const errors = inputCheck(req.body, 'party_id');

    if (errors) {
        res.status(400).json({error: errors});
        return;
    }

    const sql = 'UPDATE candidates SET party_id = ? WHERE id = ?';
    const params = [req.body.party_id, req.params.id];

    db.query(sql, params, (err, result) => {
        // if there is a grievous error
        if (err) {  
            res.status(400).json({error: err.message});
            // if the update doesn't happen
        } else if (!result.affectedRows) {
            res.json({
                message: 'Candidate not found'
            });
            // if the update is successful
        } else {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
});

app.get((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
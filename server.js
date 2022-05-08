
const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/api', apiRoutes);

app.get((req, res) => {
    res.status(404).end();
});

//start server after DB connection

db.connect(err => {
    if (err) throw err;
    console.log("Database connected");
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });
});


# U Develop It Voting Application

## Description

This is an online full stack application with a SQL database backend for handling the officer voting at U Develop It.  This application tracked candidates, parties, voters and votes requiring a SQL table for each.   This application was an opportunity to build SQL and Node.js skills.  This project only involved building the back-end.  Another team is building the front-end.


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

This application requires that a MYSQL server be installed and running on the server.   Once running, there are three files in the db folder that need to be executed from within MySQL to build the database.  However, before doing that, this application will have to be cloned to a local folder on the server from GitHub:  https://github.com/melliott7264/u-develop-it.   Once cloned, from the root of the installation folder where the package.json file resides, run "npm install".  This assumes that npm has already been installed on your server along with MySQL.   The "npm install" will install all the dependencies including Express and the MySQL2 middleware.  At this point you can log onto the MySQL shell and run the following instructions to build the database:  "./db/db.sql;", ".db/schema.sql", ".db/seeds.sql".   Finally start the server by executing "npm start".   You should receive a message that the server is now running on port 3001.  

## Usage

As this is a backend application only,  the functionality must be accessed through the yet to developed front-end application.   All the required CRUD functionality is accessible through the routes defined in candidateRoutes.js, partyRoutes.js, voterRoutes.js, and voteRoutes.js in the /routes/apiRoutes folder.   See these files for the details of the api calls.  All the calls are on either /api/candidates, /api/parties, /api/voters, or /api/votes.   I have used the plural for all the calls to keeps things simpler.   


## Credits

Mark Elliott  https://github.com/melliott7264

This application was build as an exercise of Module 12 of the University of Richmond Coding Boot Camp.   Most of the code was provided.

## License

Copyright (c) 2022 Mark Elliott

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---


## Tests

There is a JEST test of the inputCheck.js function in the /utils folder.  This function checks for proper input before being passed to the back-end SQL queries.   "npm test" will run the test routine.
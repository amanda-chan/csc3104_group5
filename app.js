const express = require('express');
const exphbs  = require('express-handlebars'); // templating engine for generating dynamic HTML and other markup in web applications
const bodyParser = require('body-parser'); // handle various types of data in the request body
const app = express(); // create Express server
const port = 3000;

// import the code that setup db tables
const createTables = require('./database/dbTableSetup');
createTables();

// configure and setup handlebars
var hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// middleware to parse the HTTP request body, allowing you to read data submitted via POST requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// load routes
const loginRoute = require('./routes/login');

// use routes
app.use('/', loginRoute);


app.listen(port, () => {
  console.log(`Application running on: http://localhost:${port}`);
});
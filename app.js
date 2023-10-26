const express = require('express');
const exphbs  = require('express-handlebars'); // templating engine for generating dynamic HTML and other markup in web applications
const app = express(); // create Express server
const port = 3000;

// import the code that setup db tables
const createTables = require('./database/dbTableSetup');
createTables();

// configure and setup handlebars
var hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// load routes
const loginRoute = require('./routes/login');

// use routes
app.use('/', loginRoute);


app.listen(port, () => {
  console.log(`Application running on: http://localhost:${port}`);
});
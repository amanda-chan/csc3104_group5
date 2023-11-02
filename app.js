const express = require('express');
const path = require('path'); 
const exphbs  = require('express-handlebars'); // templating engine for generating dynamic HTML and other markup in web applications
const bodyParser = require('body-parser'); // handle various types of data in the request body
const session = require('express-session'); // store session when user logs in
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

// set up express-session middleware
app.use(session({
  secret: 'your_secret_here', // a secret key for signing the session ID cookie
  resave: false, // avoids resaving the session if nothing has changed
  saveUninitialized: false, // forces a new session that is not yet saved to be saved
  cookie: { secure: false } // set secure to true if using HTTPS
}));

//public folder (css, js file)
app.use(express.static(path.join(__dirname, 'public')));

// load routes
const loginRoute = require('./routes/login');
const creatorRoute = require('./routes/creator');

// use routes
app.use('/', loginRoute);
app.use('/creator', creatorRoute)




app.listen(port, () => {
  console.log(`Application running on: http://localhost:${port}`);
});
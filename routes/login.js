const express = require('express');
const router = express.Router();
const user = require('../models/User');

// handling GET requests to "/" for login
router.get('/', (req, res) => {
    res.render('login/login', { layout: false }); // render the login page
});

// handling GET requests for "/register"
router.get('/register', (req, res) => {
    res.render('login/register', { layout: false }); // render the login page
});

// handling POST requests for "/register"
router.post('/register', (req, res, next) => { 

    // get form details
    const name = req.body.name;
    const email = req.body.email;
    const role = req.body.role;
    const password = req.body.password;

    // create account and retrieve details to be stored into db

});

module.exports = router;
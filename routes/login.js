const express = require('express');
const router = express.Router();
const user = require('../models/User');

// handling GET requests to "/" for login
router.get('/', (req, res) => {
    res.render('login/login', { layout: false }); // render the login page
});

module.exports = router;
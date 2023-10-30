const express = require('express');
const { Web3 } = require('web3'); // used for geth
const router = express.Router();
const user = require('../models/User');

// initialize Web3.js with the URL of your Geth node
const web3 = new Web3('http://localhost:8545'); // replace with your Geth node URL

// handling GET requests for "/creator/dashboard"
router.get('/dashboard', (req, res) => {

    const name = req.session.name;

    res.render('creator/dashboard', { name: name, layout: false }); // render the creator dashboard page
});

module.exports = router;


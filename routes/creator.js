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

// handling GET requests for "/creator/add_campaign"
router.get('/add_campaign', (req, res) => {

    // get form details
    const title = req.body.title;
    const description = req.body.description;
    const funding_target = req.body.funding_target;
    const minimum_contribution = req.body.minimum_contribution;
    const campaign_duration = req.body.campaign_duration;
    
    res.render('creator/add_campaign', { layout: false }); // render the creator dashboard page
});

module.exports = router;


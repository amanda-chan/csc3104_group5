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

// handling GET requests for "/creator/dashboardv2"
router.get('/dashboardv2', (req, res) => {

    const name = req.session.name;

    res.render('creator/dashboardv2', { name: name, layout: false }); // render the creator dashboard page
});


// handling GET requests for "/creator/donation"
router.get('/donation', (req, res) => {

    const name = req.session.name;

    res.render('creator/donation', { name: name, layout: false }); // render the creator donation page
});

// handling GET requests for "/withdraw/donation"
router.get('/withdraw', (req, res) => {

    const name = req.session.name;

    res.render('creator/withdraw', { name: name, layout: false }); // render the creator donation page
});

// handling GET requests for "/withdraw_request/donation"
router.get('/withdraw_request', (req, res) => {

    const name = req.session.name;

    res.render('creator/withdraw_request', { name: name, layout: false }); // render the creator donation page
});

// handling GET requests for "/withdraw_requestv2/donation"
router.get('/withdraw_requestv2', (req, res) => {

    const name = req.session.name;

    res.render('creator/withdraw_requestv2', { name: name, layout: false }); // render the creator donation page
});

// handling GET requests for "/home"
router.get('/home', (req, res) => {

    const name = req.session.name;

    res.render('creator/home', { name: name, layout: false }); // render the creator donation page
});


// Handling GET requests for "/creator/add_campaign"
router.get('/add_campaign', (req, res) => {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const funding_target = req.body.funding_target;
        const minimum_contribution = req.body.minimum_contribution;
        const campaign_duration = req.body.campaign_duration;
            // You should render a view or send a response here.
            res.render('creator/add_campaign', {layout: false });
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


// Handling POST requests to "/add_campaign" for adding a campaign
router.post('/add_campaign', async (req, res, next) => {
    try {
        // Retrieve user from the session
        const user = await User.findByPk(req.session.user_email);
        
        // Get form details
        const title = req.body.title;
        const description = req.body.description;
        const funding_target = req.body.funding_target;
        const minimum_contribution = req.body.minimum_contribution;
        const campaign_duration = req.body.campaign_duration;

        // Check if user is available in the session
        if (!user) {
            res.status(401).send('User not authorized');
            return;
        }

        // Retrieve the user email from the user object
        const user_email = user.user_email;

        // Create a new Campaign object with user_email set
        const newCampaign = Campaign.build({
            title: title,
            description: description,
            funding_target: funding_target,
            minimum_contribution: minimum_contribution,
            campaign_duration: campaign_duration,
            user_email: user_email, // Set the user_email field
        });

        // Save the new campaign to the database
        await newCampaign.save();

        res.render('creator/dashboard', { user_email: user_email, layout: false }); // Render the creator dashboard page
    } catch (error) {
        // Handle any errors that may occur during the database query or campaign creation
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;


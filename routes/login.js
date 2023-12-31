const express = require('express');
const crypto = require('crypto'); // for sha256 hashing
const router = express.Router();

// handling GET requests for "/metamask"
router.get('/metamask', (req, res) => {
    res.render('login/metamask', { layout: false }); // render the metamask page
});

// handling POST requests for "/metamask"
router.post('/metamask', async (req, res, next) => {

    // get post details for ethereum address
    const ethereumAddress = req.body.address;
    req.session.address = ethereumAddress; // place the ethereum address in the session
    console.log("Logged in with: %s", ethereumAddress);
    return res.status(200).json({ redirectTo: '/creator/dashboard' })
});

module.exports = router;

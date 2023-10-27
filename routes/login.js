const express = require('express');
const crypto = require('crypto'); // for sha256 hashing
const { Web3 } = require('web3'); // used for geth
const router = express.Router();
const user = require('../models/User');

// initialize Web3.js with the URL of your Geth node
const web3 = new Web3('http://localhost:8545'); // replace with your Geth node URL

// function to hash string
function sha256Hash(inputString) {
    const hash = crypto.createHash('sha256');
    hash.update(inputString);
    return hash.digest('hex');
}

// function to check if an user email exists
async function doesUserExist(email) {
    try {
        const user = await User.findOne({
            where: { user_email : email }
        });
        return !!user; // if user is found, the email exists; otherwise, it doesn't
    } catch (error) {
        console.error('Error checking if email exists:', error);
        return false; // handle errors as needed
    }
}

// handling GET requests to "/" for login
router.get('/', (req, res) => {
    res.render('login/login', { layout: false }); // render the login page
});

// handling GET requests for "/register"
router.get('/register', (req, res) => {
    res.render('login/register', { layout: false }); // render the login page
});

// handling POST requests for "/register"
router.post('/register', async (req, res, next) => { 

    // get form details
    const name = req.body.name;
    const email = req.body.email;
    const role = req.body.role;
    const password = req.body.password;

    // check if the user already exists
    const emailExists = await doesUserExist(email);

    if (emailExists) {
        const errorMessage = 'Email already exists. Please use a different email.';
        res.render('login/register', { errorMessage, layout: false });
    }

    // hash password
    const hashedPassword = sha256Hash(password);

    // create account with ethereum and retrieve details to be stored into db
    const ethAccount = web3.eth.accounts.create();
    const ethereumAddress = ethAccount.address;
    const privateKey = ethAccount.privateKey;
    const balance = 0;

    // create a new user instance
    const newUser = user.build({
        user_email: email,
        name: name,
        role: role,
        password: hashedPassword,
        account_address: ethereumAddress,
        private_key: privateKey,
        balance: balance,
    });

    // save the new user to the database
    await newUser.save();

    return res.redirect('/');

});

module.exports = router;
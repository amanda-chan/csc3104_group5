const express = require('express');
const crypto = require('crypto'); // for sha256 hashing
const router = express.Router();
const User = require('../models/User');

// function to hash string
function sha256Hash(inputString) {
    const hash = crypto.createHash('sha256');
    hash.update(inputString);
    return hash.digest('hex');
}

// function to check if an user email exists
async function doesUserExist(email) {
    try {
        
        // find the user by email in the database
        const user = await User.findByPk(email);
        
        return !!user; // if user is found, the email exists; otherwise, it doesn't
    
    } catch (error) {

        return false;
    }
}

// authentication logic implemented as an async function
async function authenticatedSuccessfully(user_email, providedPassword) {

    try {

        // find the user by email in the database
        const user = await User.findByPk(user_email);

        // retrieve the hashed password
        const originalPassword = user.password;

        // compare the provided password with the original password
        if (providedPassword === originalPassword) {

            // if the passwords match, authentication is successful
            return true;

        }

    } catch { // unable to find user from db

        return false;

    }

}

// handling GET requests to "/" for login
router.get('/', (req, res) => {
    res.render('login/login', { layout: false }); // render the login page
});

// handling POST requests to "/" for login
router.post('/', async (req, res, next) => {

    // get form details
    const username = req.body.username;
    const password = req.body.password; 

     // hash password
     const hashedPassword = sha256Hash(password);

     // check the username and password for authentication
    if (await authenticatedSuccessfully(username, hashedPassword)) {

        // find the user by email in the database
        const user = await User.findByPk(username);

        req.session.user_email = user.user_email;
        req.session.name = user.name;
        req.session.role = user.role;

        return res.redirect('/metamask');
        

    } else {

        // authentication failed
        const errorMessage = 'Invalid username or password. Please try again.';
        return res.render('login/login', { errorMessage, layout: false });
    }

});

// handling GET requests for "/register"
router.get('/register', (req, res) => {
    res.render('login/register', { layout: false }); // render the register page
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
    } else {

        // hash password
        const hashedPassword = sha256Hash(password);

        // create a new user instance
        const newUser = User.build({
            user_email: email,
            name: name,
            role: role,
            password: hashedPassword,
        });

        // save the new user to the database
        await newUser.save();

        return res.redirect('/');

    }

});

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

    const role = req.session.role;

    if (role === "Creator") { // if user is a Creator, head to creator dashboard

        return res.status(200).json({ redirectTo: '/creator/dashboard' })

    } else { // if user is a Backer, head to backer dashboard

        return res.status(200).json({ redirectTo: '/backer/dashboard' });
    }

});

module.exports = router;
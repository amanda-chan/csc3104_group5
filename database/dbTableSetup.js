const Sequelize = require('sequelize');
const db = require('./dbSetup');
const user = require('../models/User');
const campaign = require('../models/Campaign');
const contribution = require('../models/Contribution');
const tokenizedContribution = require('../models/TokenizedContribution');
const smartContract = require('../models/SmartContract');

function createTables() {
    db.authenticate()
    .then(() => {

        console.log('Conected to database successfully.');

        // sync the models with the database 
        // drop all tables and then recreate them
        db.sync({ force: true })
        .then(() => {
            console.log('Tables are dropped and re-created.');
        })
        .catch((error) => {
            console.error('Error dropping and recreating tables:', error);
        });

    })
    .catch((error) => {
        console.error('Unable to connect to database:', error);
    });
}

module.exports = createTables; // export the function to be used in app.js
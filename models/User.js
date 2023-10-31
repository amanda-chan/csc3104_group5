const Sequelize = require('sequelize');
const db = require('../database/dbSetup');

// creates a user(s) table in MySQL Database
// note that Sequelize automatically pleuralizes the entity name as the table name

const User = db.define('users', {
    // set email as the primary key
    user_email: {
        type: Sequelize.STRING(64),
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING(64),
    },
    role: {
        type: Sequelize.STRING(16),
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = User;
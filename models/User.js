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
        type: Sequelize.STRING(64),
        allowNull: false,
    },
    // attributes when an Ethereum account is created
    account_address: {
        type: Sequelize.STRING(64),
        unique: true,
        allowNull: false,
    },
    private_key: {
        type: Sequelize.STRING(64),
        allowNull: false,
    },
    keystore_file_path: {
        type: Sequelize.STRING(255),
    },
    balance: {
        type: Sequelize.DECIMAL(18, 9),
        allowNull: false,
    },
    transaction_history: {
        type: Sequelize.JSON,
    },
    gas_limit: {
        type: Sequelize.INTEGER,
    },
    gas_price: {
        type: Sequelize.DECIMAL(18, 9),
    },
});

module.exports = User;
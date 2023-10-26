const Sequelize = require('sequelize');
const db = require('../database/dbSetup');

// creates a smart contract(s) table in MySQL Database
// note that Sequelize automatically pleuralizes the entity name as the table name

const SmartContract = db.define('smart_contracts', {
    contract_address: {
        type: Sequelize.STRING(64),
        allowNull: false,
    },
    owner_address: {
        type: Sequelize.STRING(64),
        allowNull: false,
    },
    bytecode: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    abi: {
        type: Sequelize.JSON,
    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    campaign_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'campaigns',
            key: 'campaign_id',
        },
    },
});

module.exports = SmartContract;
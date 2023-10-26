const Sequelize = require('sequelize');
const db = require('../database/dbSetup');

// creates a tokenized contribution(s) table in MySQL Database
// note that Sequelize automatically pleuralizes the entity name as the table name

// if tokens are used
const TokenizedContribution = db.define('tokenized_contributions', {
    token_holding_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    token_address: {
        type: Sequelize.STRING(64),
    },
    token_amount: {
        type: Sequelize.INTEGER,
    },
    contribution_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'contributions',
            key: 'contribution_id',
        },
    },
});

module.exports = TokenizedContribution;
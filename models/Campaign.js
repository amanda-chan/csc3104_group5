const Sequelize = require('sequelize');
const db = require('../database/dbSetup');

// creates a campaign(s) table in MySQL Database
// note that Sequelize automatically pleuralizes the entity name as the table name

const Campaign = db.define('campaigns', {
    campaign_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true, // auto-incrementing primary key
    },
    title: {
        type: Sequelize.STRING(255),
    },
    description: {
        type: Sequelize.TEXT,
    },
    funding_target: {
        type: Sequelize.DECIMAL(18, 2),
    },
    minimum_contribution: {
        type: Sequelize.DECIMAL(18, 2),
    },
    campaign_duration: {
        type: Sequelize.DATE,
    },
    current_amount_raised: {
        type: Sequelize.DECIMAL(18, 2),
    },
    is_active: {
        type: Sequelize.BOOLEAN,
    },
    user_email: {
        type: Sequelize.STRING(64),
        allowNull: false,
        references: {
            model: 'users',
            key: 'user_email',
        },
    },
});

module.exports = Campaign;

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
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    funding_target: {
        type: Sequelize.DECIMAL(18, 2),
        allowNull: false,
    },
    minimum_contribution: {
        type: Sequelize.DECIMAL(18, 2),
        allowNull: false,
    },
    campaign_duration: {
        type: Sequelize.DATE,
        allowNull: false,
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

const Sequelize = require('sequelize');
const db = require('../database/dbSetup');

// creates a contribution(s) table in MySQL Database
// note that Sequelize automatically pleuralizes the entity name as the table name

const Contribution = db.define('contributions', {
    contribution_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true, // auto-incrementing primary key
    },
    amount_contributed: {
        type: Sequelize.DECIMAL(18, 2),
    },
    timestamp: {
        type: Sequelize.DATE,
    },
    user_email: {
        type: Sequelize.STRING(64),
        allowNull: false,
        references: {
            model: 'users',
            key: 'user_email',
        },
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

module.exports = Contribution;
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Application = sequelize.define('application', {
    code: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    summary: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
    //id_employee

});

module.exports = Application;
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Employee = sequelize.define('employee', {

    date_of_admission: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    salary: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
    
});

module.exports = Employee;
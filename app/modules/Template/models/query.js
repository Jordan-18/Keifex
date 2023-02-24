const sequelize = require('sequelize');
const db = require('../../../config/database');
const queryInterface = db.getQueryInterface();
const {DataTypes} = sequelize;

module.exports = {
    up: queryInterface.addColumn('templates','test',{
        type: DataTypes.STRING,
        defaultValue: 3.14,
        allowNull: false
    }),
    
    remove: queryInterface.removeColumn('templates', 
        'template_name'
    ),

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('templates');
    }
}
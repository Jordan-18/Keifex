const sequelize = require('sequelize');
const db = require('../../../config/database');
const queryInterface = db.getQueryInterface();

const {DataTypes} = sequelize;

const Auth = db.define('Auths', {
    auth_id: {
        type:sequelize.UUID,
        primaryKey: true,
        defaultValue: sequelize.UUIDV4,
    },
    auth_user_id: {
        type:DataTypes.STRING(32)
    },
    auth_ip_address: {
        type:DataTypes.TEXT('medium')
    },
});

// const update = queryInterface.addColumn('Auths','test',{
//     type: DataTypes.STRING,
//     defaultValue: 3.14,
//     allowNull: true
// })

// const remove = queryInterface.removeColumn('Auths', 'auth_name')

// const down = (queryInterface, Sequelize) => {return queryInterface.dropTable('Auths');}

(async() => {
    await db.sync()
})();

module.exports = Auth

const sequelize = require('sequelize');
const db = require('../../../config/database');
const queryInterface = db.getQueryInterface();

const {DataTypes} = sequelize;

const User = db.define('Users', {
    user_id: {
        type:sequelize.UUID,
        primaryKey: true,
        defaultValue: sequelize.UUIDV4,
    },
    user_name: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
    user_role_id: {
        type: DataTypes.STRING(32),
        defaultValue: 0,
        allowNull: false,
    },
    user_email:{
        type:DataTypes.STRING(32),
    },
    user_phone:{
        type:DataTypes.STRING(20),
    },
    user_password:{
        type: DataTypes.STRING(64),
        allowNull: false,
    },
    user_status:{
        type: DataTypes.INTEGER(11),
        defaultValue: 1,
    },
}, {
    paranoid:true,
    deleteAt: 'deleted_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTablename: true
});

// const update = queryInterface.addColumn('Users','test',{
//     type: DataTypes.STRING,
//     defaultValue: 3.14,
//     allowNull: true
// })

// const remove = queryInterface.removeColumn('Users', 'user_name')

// const down = (queryInterface, Sequelize) => {return queryInterface.dropTable('Users');}

(async() => {
    await db.sync()
})();

module.exports = User

const sequelize = require('sequelize');
const db = require('../../../config/database');

const {DataTypes} = sequelize;

const User = db.define('Users', {
    user_id: {
        type:sequelize.UUID,
        primaryKey: true,
        defaultValue: sequelize.UUIDV4,
    },
    user_name: DataTypes.STRING
}, {
    paranoid:true,
    deleteAt: 'deleted_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTablename: true
});

(async() => {
    await db.sync()
})();

module.exports = User

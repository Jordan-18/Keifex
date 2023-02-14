const sequelize = require('sequelize');
const db = require('../../../config/database');

const {DataTypes} = sequelize;

const Auth = db.define('Auths', {
    auth_id: {
        type:sequelize.UUID,
        primaryKey: true,
        defaultValue: sequelize.UUIDV4,
    },
    auth_name: DataTypes.STRING
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

module.exports = Auth

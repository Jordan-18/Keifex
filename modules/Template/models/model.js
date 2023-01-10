const sequelize = require('sequelize');
const db = require('../../../config/database');

const {DataTypes} = sequelize;

const Template = db.define('templates', {
    template_id: {
        type:DataTypes.STRING,
        primaryKey: true,
    },
    template_name: DataTypes.STRING
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

module.exports = Template

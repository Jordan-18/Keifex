const sequelize = require('sequelize');
const db = require('../../../config/database');

const {DataTypes} = sequelize;

const update = queryInterface.addColumn('templates','test',{
    type: DataTypes.STRING,
    defaultValue: 3.14,
    allowNull: false
})

const remove = queryInterface.removeColumn('templates', 
    'template_name'
)

const down = (queryInterface, Sequelize) => {
    return queryInterface.dropTable('templates');
}
const Template = db.define('templates', {
    template_id: {
        type:sequelize.UUID,
        primaryKey: true,
        defaultValue: sequelize.UUIDV4,
    },
    template_name: DataTypes.STRING,
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

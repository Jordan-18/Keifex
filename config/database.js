const dotenv = require('dotenv');
const sequelize = require('sequelize');
dotenv.config();

const db = new sequelize(
    process.env.DATABSE_NAME,
    process.env.DATABSE_USER,
    process.env.DATABSE_PASSWORD,
    {
    host:process.env.DATABSE_HOST,
    dialect:'mysql'
    }
)

module.exports = db

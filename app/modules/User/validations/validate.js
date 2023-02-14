const {check} = require('express-validator');

const validateCreate = [
    check('user_name','Name is Required').notEmpty()
]

module.exports = {
    validateCreate
}
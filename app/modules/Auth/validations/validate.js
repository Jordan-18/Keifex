const {check} = require('express-validator');

const validateCreate = [
    check('auth_name','Name is Required').notEmpty()
]

module.exports = {
    validateCreate
}
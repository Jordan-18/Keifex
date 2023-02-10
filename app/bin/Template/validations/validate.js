const {check} = require('express-validator');

const validateCreate = [
    check('template_name','Name is Required').notEmpty()
]

module.exports = {
    validateCreate
}
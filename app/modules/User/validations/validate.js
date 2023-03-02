const {check} = require('express-validator');

const validateCreate = [
    check('user_name','Name is Required').notEmpty(),
    check('user_email','Email is Required').notEmpty().isEmail(),
    check('user_phone','Phone Number is Required').notEmpty(),
    check('user_password','Password must be 6 or more characters').isLength({ min: 6 }).notEmpty(),
]

module.exports = {validateCreate}
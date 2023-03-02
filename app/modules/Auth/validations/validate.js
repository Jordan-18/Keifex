const {check} = require('express-validator');

const ValidateRegister = [
    check('user_name','Username is Required').notEmpty(),
    check('user_email','Email is Required').notEmpty(),
    check('user_password','Username is Required').notEmpty(),
]

const ValidateLogin = [
    check('user_name','Username is Required').notEmpty(),
    check('user_password','Username is Required').notEmpty(),
]

module.exports = {ValidateRegister,ValidateLogin}
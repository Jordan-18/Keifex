const express = require('express');
const Controller = require('../controllers/index');
const {ValidateRegister,ValidateLogin} = require('../validations/validate');
const router = express.Router();


router.post('/login',ValidateLogin, Controller.Login);
router.post('/register',ValidateRegister ,Controller.Register);

module.exports = router
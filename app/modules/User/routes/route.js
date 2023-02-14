const express = require('express');
const Controllers = require('../controllers/index');
const {validateCreate} = require('../validations/validate');
const Controller = new Controllers()
const router = express.Router();

router.get('/user', Controller.index);
router.get('/user/:id',Controller.edit);
router.post('/user',validateCreate,Controller.store);
router.patch('/user/:id',validateCreate,Controller.update);
router.delete('/user/:id',Controller.delete);

module.exports = router
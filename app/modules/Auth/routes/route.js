const express = require('express');
const Controllers = require('../controllers/index');
const {validateCreate} = require('../validations/validate');
const Controller = new Controllers()
const router = express.Router();

router.get('/auth', Controller.index);
router.get('/auth/:id',Controller.edit);
router.post('/auth',validateCreate,Controller.store);
router.patch('/auth/:id',validateCreate,Controller.update);
router.delete('/auth/:id',Controller.delete);

module.exports = router
const express = require('express');
const Controllers = require('../controllers/index');
const {validateCreate} = require('../validations/validate');
const Controller = new Controllers()
const router = express.Router();

router.get('/template', Controller.index);
router.get('/template/:id',Controller.edit);
router.post('/template',validateCreate,Controller.create);
router.patch('/template/:id',validateCreate,Controller.update);
router.delete('/template/:id',Controller.delete);

module.exports = router
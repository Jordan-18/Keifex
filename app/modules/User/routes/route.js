const express = require('express');
const Controller = require('../controllers/index');
const {validateCreate} = require('../validations/validate');
const router = express.Router();


router.get('/user', Controller.Get);
router.get('/user/:id', Controller.Show);
router.post('/user', validateCreate, Controller.Store);
router.patch('/user/:id',validateCreate,Controller.Update);
router.delete('/user/:id',Controller.Destroy);

module.exports = router
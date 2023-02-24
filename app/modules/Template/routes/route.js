const express = require('express');
const Controller = require('../controllers/index');
const {validateCreate} = require('../validations/validate');
const router = express.Router();

router.get('/template', Controller.Index);
router.get('/template/:id', Controller.Edit);
router.post('/template', validateCreate, Controller.Store);
router.patch('/template/:id',validateCreate,Controller.Update);
router.delete('/template/:id',Controller.Destroy);

module.exports = router
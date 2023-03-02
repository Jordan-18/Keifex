const express = require('express');
const middlewareJWT = require('../../../config/middleware')
const Controller = require('../controllers/index');
const {validateCreate} = require('../validations/validate');
const router = express.Router();


router.get('/template', middlewareJWT, Controller.Get);
router.get('/template/:id',middlewareJWT, Controller.Show);
router.post('/template',middlewareJWT, validateCreate, Controller.Store);
router.patch('/template/:id',middlewareJWT,validateCreate,Controller.Update);
router.delete('/template/:id',middlewareJWT,Controller.Destroy);

module.exports = router
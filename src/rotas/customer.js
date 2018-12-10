const express = require('express');
const auth  = require('../services/auth-service')
const router = express.Router();

const customercontroller = require('../controllers/customer-controller')

//router.get('/', customercontroller.get);
//router.get('/:slug', customercontroller.getBydSlug);
//router.get('/list/:id', customercontroller.getBydId);
//router.get('/tags/:tags', customercontroller.getBydTag);
router.post('/',customercontroller.post);
router.post('/authenticate',customercontroller.authenticate);
//router.put('/:id', customercontroller.put);
//router.delete('/', customercontroller.delete);

module.exports = router;

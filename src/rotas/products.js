const express = require('express');
const router = express.Router();

const controller = require('../controllers/product-controller')
const authservice = require('../services/auth-service')

router.get('/', controller.get)
router.get('/:slug', controller.getBydSlug)
router.get('/list/:id', controller.getBydId)
router.get('/tags/:tags', controller.getBydTag)
router.post('/',authservice.authorize, controller.post)
router.put('/:id', controller.put)
router.delete('/', controller.delete)

module.exports = router;

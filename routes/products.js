const express = require('express');
const router = express.Router();
const { productValidationRules, validate } = require('./validation-products');
const productsController = require('../controllers/products');
const {isAuthenticated} = require('./authenticate');

router.get('/', productsController.getAll);

router.get('/:id', productsController.getSingle);

router.post('/', productValidationRules(), validate, isAuthenticated, productsController.createProduct);

router.put('/:id', productValidationRules(), validate, isAuthenticated, productsController.updateProduct);

router.delete('/:id', isAuthenticated, productsController.deleteProduct);

module.exports = router;
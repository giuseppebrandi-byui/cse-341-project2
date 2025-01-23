const express = require('express');
const router = express.Router();
const { productValidationRules, validate } = require('./validation-products');
const productsController = require('../controllers/products');

router.get('/', productsController.getAll);

router.get('/:id', productsController.getSingle);

router.post('/', productValidationRules(), validate, productsController.createProduct);

router.put('/:id', productValidationRules(), validate, productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;
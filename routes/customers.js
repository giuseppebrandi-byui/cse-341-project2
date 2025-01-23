const express = require('express');
const router = express.Router();
const { customerValidationRules, validate } = require('./validation-customers');
const customersController = require('../controllers/customers');

router.get('/', customersController.getAll);

router.get('/:id', customersController.getSingle);

router.post('/', customerValidationRules(), validate, customersController.createCustomer);

router.put('/:id', customerValidationRules(), validate, customersController.updateCustomer);

router.delete('/:id', customersController.deleteCustomer);

module.exports = router;
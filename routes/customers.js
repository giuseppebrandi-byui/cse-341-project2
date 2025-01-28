const express = require('express');
const router = express.Router();
const { customerValidationRules, validate } = require('./validation-customers');
const customersController = require('../controllers/customers');
const {isAuthenticated} = require('./authenticate');

router.get('/', customersController.getAll);

router.get('/:id', customersController.getSingle);

router.post('/', isAuthenticated, customerValidationRules(), validate, customersController.createCustomer);

router.put('/:id', isAuthenticated, customerValidationRules(), validate, customersController.updateCustomer);

router.delete('/:id', isAuthenticated, customersController.deleteCustomer);

module.exports = router;
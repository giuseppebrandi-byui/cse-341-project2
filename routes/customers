const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customers');

router.get('/', customersController.getAll);
router.get('/:id', customersController.getSingle);

module.exports = router;
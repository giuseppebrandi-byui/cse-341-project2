const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const createError = require('http-errors');

const getAll = async (req, res, next) => { 
  try {
    const customers_result = await mongodb.getDatabase().db().collection('customers').find();
    customers_result.toArray().then((customers) => {
      // If the function returns an empty array, return 404 status code
      if (customers.length === 0 || !customers) {
        res.status(404).json({ 'message: ': 'No customers found' })
        return;
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(customers);
    });
  } catch (error) { 
    next(createError(500, 'Something went wrong. Try again later.'));
    return;
  }
}

const getSingle = async (req, res, next) => {
  if (!(req.params.id && req.params.id.length === 24)) {
    next(createError(400, 'Please enter a valid id with a string of 24 hex characters!'));
    return;
  }
  try {
    const customerId = ObjectId.createFromHexString(req.params.id);
    const customers_result = await mongodb.getDatabase().db().collection('customers').find({_id: customerId});
    customers_result.toArray().then((customers) => {
      if (customers.length === 0 || !customers) { 
        next(createError(404, 'Sorry! No customer with the entered id '));
        return;
    }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(customers[0]);
    });
  } catch (error) { 
    createError(500, 'Something went wrong. Try again later.');
  }
}

const createCustomer = async (req, res) => { 
  const customer = {
    name: req.body.name,
    age: req.body.age,
    username: req.body.username,
    email: req.body.email,
    address: { 
      street: req.body.address.street,
      city: req.body.address.city,
      zip: req.body.address.zip,
    },
    phone: req.body.phone,
    occupation: req.body.occupation
  };
  const response = await mongodb.getDatabase().db().collection('customers').insertOne(customer);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else { 
    res.status(500).json(response.error || 'Some error occurred while creating the customer');
  }
}

const updateCustomer = async (req, res, next) => {
  if (!(req.params.id && req.params.id.length === 24)) {
    next(createError(400, 'Please enter a valid id with a string of 24 hex characters!'));
    return;
  }
  const customerId = ObjectId.createFromHexString(req.params.id);
  const customer = {
    name: req.body.name,
    age: req.body.age,
    username: req.body.username,
    email: req.body.email,
    address: { 
      street: req.body.address.street,
      city: req.body.address.city,
      zip: req.body.address.zip
    },
    phone: req.body.phone,
    occupation: req.body.occupation
  };
  const response = await mongodb.getDatabase().db().collection('customers').replaceOne({ _id: customerId }, customer);
  if (response.modifiedCount > 0) {
    res.status(201).json({
      'Message: ': 'Your customer has been updated successfully',
      'Updated Customer: ': customer
    });
  } else { 
    res.status(500).json(response.error || 'Sorry no customer with that id');
  }
}

const deleteCustomer = async (req, res, next) => { 
  if (!(req.params.id && req.params.id.length === 24)) {
    next(createError(400, 'Please enter a valid id with a string of 24 hex characters!'));
    return;
  }
  const customerId = ObjectId.createFromHexString(req.params.id);
  const response = await mongodb.getDatabase().db().collection('customers').deleteOne({ _id: customerId }, true);
  if (response.deletedCount > 0) { 
    res.status(201).json({
      'Message: ': 'The customer has been deleted successfully.',
    });
    } else { 
    res.status(500).json(response.error || 'Sorry no customer with that id');
  };
}

module.exports = { getAll, getSingle, createCustomer, updateCustomer, deleteCustomer };
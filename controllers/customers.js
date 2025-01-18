const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => { 
  const customers_result = await mongodb.getDatabase().db().collection('customers').find();
  customers_result.toArray().then((customers) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(customers);
  });
}

const getSingle = async (req, res) => { 
  const customerId = ObjectId.createFromHexString(req.params.id);
  const customers_result = await mongodb.getDatabase().db().collection('customers').find({_id: customerId});
  customers_result.toArray().then((customers) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(customers[0]);
  });
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
    res.status(204).send();
  } else { 
    res.status(500).json(response.error || 'Some error occurred while creating the customer');
  }
}

const updateCustomer = async (req, res) => { 
  const customerId = ObjectId.createFromHexString(req.params.id);
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
  const response = await mongodb.getDatabase().db().collection('customers').replaceOne({ _id: customerId }, customer);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else { 
    res.status(500).json(response.error || 'Some error occurred while updating the customer');
  }
}

const deleteCustomer = async (req, res) => { 
  const customerId = ObjectId.createFromHexString(req.params.id);
  const response = await mongodb.getDatabase().db().collection('customers').deleteOne({ _id: customerId }, true);
  if (response.deletedCount > 0) { 
    res.status(204).send();
    } else { 
    res.status(500).json(response.error || 'Some error occurred while deleting the customer');
  };
}

module.exports = { getAll, getSingle, createCustomer, updateCustomer, deleteCustomer };
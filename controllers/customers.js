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

module.exports = { getAll, getSingle };
//  createCustomer, updateCustomer, deleteCustomer
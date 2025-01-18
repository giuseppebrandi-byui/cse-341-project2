const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => { 
  const result = await mongodb.getDatabase().db().collection('products').find();
  result.toArray().then((products) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(products);
  });
}

const getSingle = async (req, res) => { 
  const productId = ObjectId.createFromHexString(req.params.id);
  const result = await mongodb.getDatabase().db().collection('products').find({_id: productId});
  result.toArray().then((products) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(products[0]);
  });
}

module.exports = { getAll, getSingle }
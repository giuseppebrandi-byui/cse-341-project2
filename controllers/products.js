const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => { 
  const products_result = await mongodb.getDatabase().db().collection('products').find();
  products_result.toArray().then((products) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(products);
  });
}

const getSingle = async (req, res) => { 
  const productId = ObjectId.createFromHexString(req.params.id);
  const products_result = await mongodb.getDatabase().db().collection('products').find({_id: productId});
  products_result.toArray().then((products) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(products[0]);
  });
}

module.exports = { getAll, getSingle }
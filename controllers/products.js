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

const createProduct = async (req, res) => { 
  const product = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    image: req.body.image,
    ratings: { 
      rate: req.body.ratings.rate,
      count: req.body.ratings.count
    }
  };
  const response = await mongodb.getDatabase().db().collection('products').insertOne(product);
  if (response.acknowledged) {
    res.status(204).send();
  } else { 
    res.status(500).json(response.error || 'Some error occurred while creating the product');
  }
}

const updateProduct = async (req, res) => { 
  const productId = ObjectId.createFromHexString(req.params.id);
  const product = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    image: req.body.image,
    ratings: { 
      rate: req.body.ratings.rate,
      count: req.body.ratings.count
    }
  };
  const response = await mongodb.getDatabase().db().collection('products').replaceOne({ _id: productId }, product);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else { 
    res.status(500).json(response.error || 'Some error occurred while updating the product');
  }
}

const deleteProduct = async (req, res) => { 
  const productId = ObjectId.createFromHexString(req.params.id);
  const response = await mongodb.getDatabase().db().collection('products').deleteOne({ _id: productId }, true);
  if (response.deletedCount > 0) { 
    res.status(204).send();
    } else { 
    res.status(500).json(response.error || 'Some error occurred while deleting the product');
  };
}

module.exports = { getAll, getSingle, createProduct, updateProduct, deleteProduct }
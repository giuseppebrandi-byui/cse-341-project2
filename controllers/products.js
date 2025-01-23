const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const createError = require('http-errors');

const getAll = async (req, res, next) => {
  try {
    const products_result = await mongodb.getDatabase().db().collection('products').find();
    products_result.toArray().then((products) => {
      if (products.length === 0 || !products) { 
        res.status(404).json({ 'message: ': 'No products found' })
        return;
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(products);
    });
  } catch (error) { 
    next(createError(500, 'Something went wrong. Try again later.'))
  }
}

const getSingle = async (req, res, next) => { 
  if (!(req.params.id && req.params.id.length === 24)) { 
    next(createError(400, 'Please enter a valid id with a string of 24 hex characters!'));
    return;
  }
  try {
    const productId = ObjectId.createFromHexString(req.params.id);
    const products_result = await mongodb.getDatabase().db().collection('products').find({_id: productId});
    products_result.toArray().then((products) => {
      if (products.length === 0 || !products) { 
        next(createError(404, 'Sorry! No product with the entered id.'));
        return;
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(products[0]);
    });
  } catch (error) { 
    createError(500, 'Something went wrong. Try again later.');
  }
}

const createProduct = async (req, res) => {
  const product = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    image: req.body.image,
    rating: req.body.rating
  };
  const response = await mongodb.getDatabase().db().collection('products').insertOne(product);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the product');
  }
};

const updateProduct = async (req, res, next) => { 
  if (!(req.params.id && req.params.id.length === 24)) { 
    next(createError(400, 'Please enter a valid id with a string of 24 hex characters!'));
    return;
  }
  const productId = ObjectId.createFromHexString(req.params.id);
  const product = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    image: req.body.image,
    rating: req.body.rating
  };
  const response = await mongodb.getDatabase().db().collection('products').replaceOne({ _id: productId }, product);
  if (response.modifiedCount > 0) {
    res.status(201).json({
      'Message: ': 'Your product has been updated successfully',
      'Updated Product: ': product,
    });
  } else { 
    res.status(500).json(response.error || 'Sorry no product with that id');
  }
}

const deleteProduct = async (req, res, next) => { 
  if (!(req.params.id && req.params.id.length === 24)) {
    next(createError(400, 'Please enter a valid id with a string of 24 hex characters!'));
    return;
  }
  const productId = ObjectId.createFromHexString(req.params.id);
  const response = await mongodb.getDatabase().db().collection('products').deleteOne({ _id: productId }, true);
  if (response.deletedCount > 0) { 
     res.status(201).json({
      'Message: ': 'The product has been deleted successfully.',
    });
    } else { 
    res.status(500).json(response.error || 'Sorry no product with that id');
  };
}

module.exports = { getAll, getSingle, createProduct, updateProduct, deleteProduct }
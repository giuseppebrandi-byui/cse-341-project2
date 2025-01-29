const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const createError = require('http-errors');

const getAll = async (req, res, next) => {
  try {
    const products_result = await mongodb.getDatabase().db().collection('products').find();
    products_result.toArray().then((products) => {
      if (products.length === 0 || !products) { 
        res.status(400).json({ 'message: ': 'No products found' })
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
  res.setHeader('Content-Type', 'application/json');
  if (!(req.params.id && req.params.id.length === 24)) { 
    next(createError(400, 'Please enter a valid id with a string of 24 hex characters!'));
    return;
  }
  try {
    const productId = ObjectId.createFromHexString(req.params.id);
    const products_result = await mongodb.getDatabase().db().collection('products').find({_id: productId});
    products_result.toArray().then((products) => {
      if (products.length === 0 || !products) { 
        next(createError(400, 'Sorry! No product with the entered id.'));
        return;
      }
      res.status(200).json(products[0]);
    });
  } catch (error) { 
    createError(500, 'Something went wrong. Try again later.' + error.toString());
  }
}

const createProduct = async (req, res, next) => {
  try {
    const product = {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      image: req.body.image,
      rating: req.body.rating
    };
    const response = await mongodb.getDatabase().db().collection('products').insertOne(product);
    res.setHeader('Content-Type', 'application/json');
    if (response.acknowledged) {
      res.status(202).json({
        'message: ': 'A new product was added successfully.',
        'added product: ' : product,
      });
    } else {
      next(createError(400, 'Some error occurred while creating the product. Try again later.'));
      return;
    }
  } catch (error) { 
    next(createError(500, 'Some error occurred while creating the product. Try again later.'));
  }
};

const updateProduct = async (req, res, next) => { 
  res.setHeader('Content-Type', 'application/json');
  try {
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
      next(createError(400, 'Sorry no product with that id'));
      return;
    }
  } catch (error) { 
    next(createError(500, 'Some error occurred while updating the product. Please check id.'));
  }
}

const deleteProduct = async (req, res, next) => { 
  res.setHeader('Content-Type', 'application/json');
  try {
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
      next(createError(400, 'Sorry no product with that id'));
      return;
    };
  } catch (error) { 
    next(createError(500, 'Some error occurred while deleting the product. Try again later.'));
  }
}

module.exports = { getAll, getSingle, createProduct, updateProduct, deleteProduct }
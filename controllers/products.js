const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const createError = require('http-errors');

const getAll = async (req, res, next) => {
   /*  #swagger.tags = ['Product']
      #swagger.description = 'Endpoint to get all Product.' */
  res.setHeader('Content-Type', 'application/json');
  try {
    const products_result = await mongodb.getDatabase().db().collection('products').find();
    products_result.toArray().then((products) => {
      // If the function returns an empty array, return 400 status code
      if (products.length === 0 || !products) {
        // #swagger.responses[400] = 'No products found'
        res.status(400).json({ 'message: ': 'No products found' })
        return;
      }
      // #swagger.responses[200] = 'products found'
      res.status(200).json(products);
    });
  } catch (error) { 
    // #swagger.responses[500] = 'Something went wrong. Try again later.'
    next(createError(500, 'Something went wrong. Try again later.'))
  }
}

const createProduct = async (req, res, next) => {
   res.setHeader('Content-Type', 'application/json')
  /*  #swagger.tags = ['Product']
      #swagger.description = 'Endpoint to add a Product.' */

  /*  #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Product information.',
        required: true,
        schema: { $ref: "#/definitions/CreateProduct" }
  } */
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
    if (response.acknowledged) {
      // #swagger.responses[202] = { 'message: ': 'A new product has been added successfully.','added product: ' : 'product'}
      res.status(202).json({
        'message: ': 'A new product has been added successfully.',
        'added product: ' : product,
      });
    } else {
      // #swagger.responses[400] =  'Some error occurred while creating the product.Try again later.'
      next(createError(400, 'Some error occurred while creating the product. Try again later.'));
      return;
    }
  } catch (error) { 
    // #swagger.responses[500] =  'Some error occurred while creating the product.Try again later.'
    next(createError(500, 'Some error occurred while creating the product. Try again later.'));
  }
}

const getSingle = async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  if (!(req.params.id && req.params.id.length === 24)) {
    // #swagger.responses[400] = 'Please enter a valid id with a string of 24 hex characters!'
    next(createError(400, 'Please enter a valid id with a string of 24 hex characters!'));
    return;
  }
  try {
    const productId = ObjectId.createFromHexString(req.params.id);
    /*  #swagger.tags = ['Product']
        #swagger.schema: { "$ref": "#/definitions/Product" },
        #swagger.description = 'Endpoint to get the specific product.'
        */
    const products_result = await mongodb.getDatabase().db().collection('products').find({ _id: productId });
    products_result.toArray().then((products) => {
      if (products.length === 0 || !products) {
        // #swagger.responses[404] = 'Sorry! No products with the entered id.'
        next(createError(404, 'Sorry! No product with the entered id.'));
        return;
      }
      // #swagger.responses[200] = 'product found'
      res.status(200).json(products[0]);
    });
  } catch (error) {
    // #swagger.responses[500] = 'Something went wrong. Try again later.
    createError(500, 'Something went wrong. Try again later.');
  }
}

const updateProduct = async (req, res, next) => { 
  res.setHeader('Content-Type', 'application/json');
  try {
    if (!(req.params.id && req.params.id.length === 24)) {
      // #swagger.responses[400] =  'Please enter a valid id with a string of 24 hex characters!'
      next(createError(400, 'Please enter a valid id with a string of 24 hex characters!'));
      return;
    }
    /*  #swagger.tags = ['Product']
      #swagger.description = 'Endpoint to update Product.' */

    /*  #swagger.parameters['obj'] = {
          in: 'body',
          description: 'Product information.',
          required: true,
        schema: { $ref: "#/definitions/UpdateProduct" }
    } */    
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
      // #swagger.responses[201] = { 'message: ': 'Your product has been updated successfully.','Updated Product: ' : 'product'}
      res.status(201).json({
        'Message: ': 'Your product has been updated successfully',
        'Updated Product: ': product,
      });
    } else {
      // #swagger.responses[400] =  'Sorry no product with that id.'
      next(createError(400, 'Sorry no product with that id'));
      return;
    }
  } catch (error) {
    // #swagger.responses[500] =  'Some error occurred while updating the product. Please check id.'
    next(createError(500, 'Some error occurred while updating the product. Please check id.'));
  }
}

const deleteProduct = async (req, res, next) => { 
   /*  #swagger.tags = ['Product']
      #swagger.description = 'Endpoint to delete all Product.' */
  res.setHeader('Content-Type', 'application/json');
  try {
    if (!(req.params.id && req.params.id.length === 24)) {
      // #swagger.responses[400] = 'Please enter a valid id with a string of 24 hex characters!'
      next(createError(400, 'Please enter a valid id with a string of 24 hex characters!'));
      return;
    }
    const productId = ObjectId.createFromHexString(req.params.id);
    const response = await mongodb.getDatabase().db().collection('products').deleteOne({ _id: productId }, true);
    if (response.deletedCount > 0) {
      // #swagger.responses[201] = { 'message: ': 'The product has been deleted successfully.'}
      res.status(201).json({
        'Message: ': 'The product has been deleted successfully.',
      });
    } else {
      // #swagger.responses[400] = 'Sorry no product with that id.'
      next(createError(400, 'Sorry no product with that id'));
      return;
    };
  } catch (error) {
    // #swagger.responses[500] = 'Some error occurred while deleting the product. Try again later.'
    next(createError(500, 'Some error occurred while deleting the product. Try again later.'));
  }
}

module.exports = { getAll, getSingle, createProduct, updateProduct, deleteProduct }

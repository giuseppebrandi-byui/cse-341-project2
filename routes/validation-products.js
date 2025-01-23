const { body, validationResult } = require('express-validator')
const productValidationRules = () => {
  return [
    
    body('title').trim().notEmpty().isLength({ min: 3 }).withMessage({"message": 'Please provide a product name.'}),

    body('price').trim().notEmpty().isLength({ min: 2 }).isFloat().withMessage({ "message": 'Please provide product price.' }),

    body('description').trim().notEmpty().isLength({ min: 5 }).withMessage({ "message": 'Please provide a product description.' }),

    body('category').trim().notEmpty().isLength({ min: 3 }).not().isNumeric().withMessage({"message":'Please provide a product name.'}),

    body('image').trim().notEmpty().withMessage({ "message": "Please provide a link for the product image (ex. https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg)" }),

    body('rating').trim().escape().notEmpty().isLength({ min: 1, max: 1 }).isInt({ min: 1, max: 5 }).withMessage({ "message": 'Please provide a number between 1 and 5.' }),

  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => {
    if (err.msg.message) { 
       extractedErrors.push(
      { "message": err.msg.message }
    )
    }
  })

  return res.status(400).json({
    error: extractedErrors
  })
}

module.exports = {
  productValidationRules,
  validate,
}
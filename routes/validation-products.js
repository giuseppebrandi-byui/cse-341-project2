const { body, validationResult } = require('express-validator')
const imageRegex = "/(https?:\/\/.*\.(?:png|jpg))/i";
const productValidationRules = () => {
  return [
    
    body('title').trim().escape().notEmpty().isLength({ min: 3 }).withMessage('Please provide a product name.'),

    body('price').trim().escape().notEmpty().isLength({ min: 2 }).isFloat().withMessage('Please provide product price.'),

    body('description').trim().escape().notEmpty().isLength({ min: 5 }).withMessage('Please provide a product description.'),

    body('category').trim().escape().notEmpty().isLength({ min: 3 }).not().isNumeric().withMessage('Please provide a product name.'),

    body('image').trim().notEmpty().escape().withMessage("Please provide a link for the product image (ex. https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg)"),

    body('rating').trim().escape().notEmpty().isLength({ min: 1, max: 1 }).isInt({min: 1, max: 5}).withMessage('Please provide a number between 1 and 5.'),

  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  productValidationRules,
  validate,
}
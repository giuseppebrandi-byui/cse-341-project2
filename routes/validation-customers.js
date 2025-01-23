const { body, validationResult } = require('express-validator')
const customerValidationRules = () => {
  return [
    
    body('name').trim().escape().notEmpty().isLength({ min: 3 }).withMessage('Please provide a full name.'),
    body('name').matches(/^[A-Za-z\s]+$/).withMessage("Numbers and symbols are not allowed."),

    body('age').trim().escape().notEmpty().isNumeric().withMessage('Please provide a number'),
    body('age').isLength({ min: 2, max: 3 }).isInt({ min: 18, max: 200 }).withMessage('Please provide your age (must be 18 years or older).'),

    body('username').isEmail().normalizeEmail({ gmail_remove_dots: true }).withMessage('Please use your email address.'),

    body('email').isEmail().normalizeEmail({ gmail_remove_dots: true }).withMessage('Please enter a valid email address.'),

    body('address.street').trim().escape().notEmpty().isLength({ min: 5 }).withMessage('Please provide a street name.'),
    body('address.city').trim().escape().notEmpty().isLength({ min: 2 }).withMessage('Please provide a city name.'),
    body('address.zip').trim().escape().notEmpty().isLength({ min: 5 }).withMessage('Please provide a zip code'),

    body('phone').trim().escape().notEmpty().isNumeric().withMessage('Phone number can only contain numbers'),
    body('phone').isInt({ allow_leading_zeroes: true }).isLength({ min: 10, max: 15 }).withMessage('Phone number must be between 10 and 15 digits'),

    body('occupation').trim().escape().notEmpty().isLength({ min: 3 }).withMessage('Please enter occupation.')
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
  customerValidationRules,
  validate,
}
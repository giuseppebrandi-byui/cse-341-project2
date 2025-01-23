const { body, validationResult } = require('express-validator')
const customerValidationRules = () => {
  return [
    
    body('name').trim().notEmpty().isLength({ min: 3 }).withMessage({ "message": 'Please provide a full name.' }),
    body('name').matches(/^[A-Za-z\s]+$/).withMessage({ "message": "Numbers and symbols are not allowed." }),

    body('age').trim().notEmpty().isNumeric().withMessage({ "message": 'Please provide a number' }),
    body('age').isLength({ min: 2, max: 3 }).isInt({ min: 18, max: 200 }).withMessage({ "message": 'Please provide your age (must be 18 years or older).' }),

    body('username').isEmail().normalizeEmail({ gmail_remove_dots: true }).withMessage({ "message": 'Please use your email address.' }),

    body('email').isEmail().normalizeEmail({ gmail_remove_dots: true }).withMessage({ "message": 'Please enter a valid email address.' }),

    body('address.street').trim().notEmpty().isLength({ min: 5 }).withMessage({ "message": 'Please provide a street name.' }),
    body('address.city').trim().notEmpty().isLength({ min: 2 }).withMessage({ "message": 'Please provide a city name.' }),
    body('address.zip').trim().notEmpty().isLength({ min: 5 }).withMessage({ "message": 'Please provide a zip code' }),

    body('phone').trim().notEmpty().isNumeric().withMessage({ "message": 'Phone number can only contain numbers' }),
    body('phone').isInt({ allow_leading_zeroes: true }).isLength({ min: 10, max: 15 }).withMessage({ "message": 'Phone number must be between 10 and 15 digits' }),

    body('occupation').trim().notEmpty().isLength({ min: 3 }).withMessage({ "message": 'Please enter occupation.' })
  ]
}

/*{
  "error": [
    {
      "message": "Please provide a product name."
    }
  ]
}*/

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => {
    if (err.msg.message) { 
      extractedErrors.push({'message' : err.msg.message })
    }
  })

  return res.status(400).json({
    error: extractedErrors,
  })
}

module.exports = {
  customerValidationRules,
  validate,
}
const { check } = require('express-validator');

// Validation rules for user registration
const register = [
  check('username')
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Username must be between 3 and 50 characters'),
  check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
  check('bio')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Bio can not exceed 500 characters'),
  check('profile_photo')
    .optional()
    .isURL()
    .withMessage('Must be a valid URL'),
];

// Validation rules for updating user details
const update = [
  check('username')
    .optional()
    .isLength({ min: 3, max: 50 })
    .withMessage('Username must be between 3 and 50 characters'),
  check('email')
    .optional()
    .isEmail()
    .withMessage('Must be a valid email address'),
  check('bio')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Bio can not exceed 500 characters'),
  check('profile_photo')
    .optional()
    .isURL()
    .withMessage('Must be a valid URL'),
];

module.exports = {
  register,
  update,
};

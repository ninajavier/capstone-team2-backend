const { check } = require('express-validator');

// Validation rules for creating a thread
const create = [
  check('user_id')
    .notEmpty()
    .withMessage('User ID is required')
    .isInt()
    .withMessage('User ID must be an integer'),
  check('train_line')
    .notEmpty()
    .withMessage('Train line is required')
    .isLength({ min: 1, max: 2 })
    .withMessage('Train line must be 1 to 2 characters'),
  check('station')
    .notEmpty()
    .withMessage('Station is required')
    .isLength({ min: 1, max: 255 })
    .withMessage('Station must be between 1 and 255 characters'),
  check('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 1, max: 255 })
    .withMessage('Title must be between 1 and 255 characters'),
  check('body')
    .isLength({ max: 65535 })
    .withMessage('Body must be up to 65535 characters'),
  check('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5'),
  check('photo_url')
    .optional()
    .isURL()
    .withMessage('Photo URL must be a valid URL'),
  check('is_favorite')
    .optional()
    .isBoolean()
    .withMessage('Is favorite must be a boolean value'),
  check('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
];

// Validation rules for updating a thread
const update = [
  check('title')
    .optional()
    .isLength({ min: 1, max: 255 })
    .withMessage('Title must be between 1 and 255 characters'),
  check('body')
    .optional()
    .isLength({ max: 65535 })
    .withMessage('Body must be up to 65535 characters'),
  check('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5'),
  check('photo_url')
    .optional()
    .isURL()
    .withMessage('Photo URL must be a valid URL'),
  check('is_favorite')
    .optional()
    .isBoolean()
    .withMessage('Is favorite must be a boolean value'),
  check('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
];

module.exports = {
  create,
  update,
};

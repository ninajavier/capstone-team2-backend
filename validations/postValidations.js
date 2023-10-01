const { check } = require('express-validator');

// Validation rules for creating a post
const create = [
  check('user_id')
    .notEmpty()
    .withMessage('User ID is required')
    .isInt()
    .withMessage('User ID must be an integer'),
  check('train_line')
    .notEmpty()
    .withMessage('Train line is required')
    .isLength({ max: 2 })
    .withMessage('Train line must be 2 characters or less'),
  check('station')
    .notEmpty()
    .withMessage('Station is required')
    .isLength({ max: 255 })
    .withMessage('Station must be 255 characters or less'),
  check('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 255 })
    .withMessage('Title must be 255 characters or less'),
  check('body')
    .notEmpty()
    .withMessage('Body is required')
    .isLength({ max: 1000 })
    .withMessage('Body must be between 1 and 1000 characters'),
  check('rating')
    .notEmpty()
    .withMessage('Rating is required')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  check('photo_url')
    .optional()
    .isURL()
    .withMessage('Invalid photo URL format'),
  check('is_favorite')
    .optional()
    .isBoolean()
    .withMessage('Is_favorite must be a boolean value'),
  check('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
];

// Validation rules for updating a post
const update = [
  check('train_line')
    .optional()
    .notEmpty()
    .isLength({ max: 2 })
    .withMessage('Train line must be 2 characters or less'),
  check('station')
    .optional()
    .notEmpty()
    .isLength({ max: 255 })
    .withMessage('Station must be 255 characters or less'),
  check('title')
    .optional()
    .notEmpty()
    .isLength({ max: 255 })
    .withMessage('Title must be 255 characters or less'),
  check('body')
    .optional()
    .notEmpty()
    .isLength({ max: 1000 })
    .withMessage('Body must be between 1 and 1000 characters'),
  check('rating')
    .optional()
    .notEmpty()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  check('photo_url')
    .optional()
    .isURL()
    .withMessage('Invalid photo URL format'),
  check('is_favorite')
    .optional()
    .isBoolean()
    .withMessage('Is_favorite must be a boolean value'),
  check('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
];

module.exports = {
  create,
  update,
};

const { check } = require('express-validator');

// Validation rules for creating a comment
const create = [
  check('user_id')
    .notEmpty()
    .withMessage('User ID is required')
    .isInt()
    .withMessage('User ID must be an integer'),
  check('content')
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ min: 1, max: 500 })
    .withMessage('Content must be between 1 and 500 characters'),
];

// Validation rules for updating a comment
const update = [
  check('content')
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ min: 1, max: 500 })
    .withMessage('Content must be between 1 and 500 characters'),
];

module.exports = {
  create,
  update,
};

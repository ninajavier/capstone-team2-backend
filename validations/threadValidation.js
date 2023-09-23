const { check } = require('express-validator');

// Validation rules for creating a thread
const create = [
  check('comment_id')
    .notEmpty()
    .withMessage('Comment ID is required')
    .isInt()
    .withMessage('Comment ID must be an integer'),
  check('content')
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ min: 1, max: 1000 })
    .withMessage('Content must be between 1 and 1000 characters'),
];

// Validation rules for updating a thread
const update = [
  check('content')
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ min: 1, max: 1000 })
    .withMessage('Content must be between 1 and 1000 characters'),
];

module.exports = {
  create,
  update,
};

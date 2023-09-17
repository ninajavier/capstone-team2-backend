const { check } = require('express-validator');

// Validation rules for creating a like
const create = [
  check('user_id')
    .notEmpty()
    .withMessage('User ID is required')
    .isInt()
    .withMessage('User ID must be an integer'),
  check('comment_id')
    .optional({ checkFalsy: true })
    .isInt()
    .withMessage('Comment ID must be an integer'),
  check('thread_id')
    .optional({ checkFalsy: true })
    .isInt()
    .withMessage('Thread ID must be an integer'),
  check('like_type')
    .notEmpty()
    .withMessage('Like type is required')
    .isIn(['upvote', 'downvote'])
    .withMessage('Like type must be either "upvote" or "downvote"'),
];

// Validation rules for updating a like
const update = [
  check('like_type')
    .notEmpty()
    .withMessage('Like type is required')
    .isIn(['upvote', 'downvote'])
    .withMessage('Like type must be either "upvote" or "downvote"'),
];

module.exports = {
  create,
  update,
};

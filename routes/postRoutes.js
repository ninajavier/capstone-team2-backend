const postsController = require('../controllers/postsController');
const express = require('express');
const router = express.Router();

// Middleware (replace `authMiddleware` and `validationMiddleware` with your actual middleware)
const validationMiddleware = require('../middleware/validationMiddleware');

// Routes
router.get('/', postsController.getAllPosts); // Apply authentication middleware here as an example
router.get('/:id', postsController.getPostById); // Apply authentication middleware here as an example

router.post(
  '/',
  validationMiddleware,
  postsController.createPost
); // Apply both authentication and validation middleware here as an example
router.put(
  '/:id',
  validationMiddleware,
  postsController.updatePost
); // Apply both authentication and validation middleware here as an example
router.delete('/:id', postsController.deletePost); // Apply authentication middleware here as an example

module.exports = router;

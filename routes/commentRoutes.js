const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");

// Middleware (replace `validationMiddleware` with your actual middleware)
const validationMiddleware = require("../middleware/validationMiddleware");

// Routes for comments related to a specific thread
router.get("/:threadId/comments", commentsController.getAllComments); // Get all comments for a specific thread
router.get("/:threadId/comments/:commentId", commentsController.getCommentById); // Get a comment by ID

router.post(
  "/:threadId/comments",
  validationMiddleware,
  commentsController.createComment
); // Create a new comment for a specific thread
router.put(
  "/:threadId/comments/:commentId",
  validationMiddleware,
  commentsController.updateComment
); // Update a comment by ID
router.delete("/:threadId/comments/:commentId", commentsController.deleteComment); // Delete a comment by ID

module.exports = router;

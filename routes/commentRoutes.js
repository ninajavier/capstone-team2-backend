const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");

// Middleware (replace `authMiddleware` and `validationMiddleware` with your actual middleware)
const authMiddleware = require('../middleware/authMiddleware');
const validationMiddleware = require("../middleware/validationMiddleware");

// Routes
router.get("/", authMiddleware, commentsController.getAllComments); // Use the new function here to get all comments
router.get("/:id", authMiddleware, commentsController.getCommentsByThreadId); // Get comments by thread ID

router.post(
  "/",
  authMiddleware,
  validationMiddleware,
  commentsController.addComment
);
router.put(
  "/:id",
  authMiddleware,
  validationMiddleware,
  commentsController.updateComment
);
router.delete("/:id", authMiddleware, commentsController.deleteComment);

module.exports = router;

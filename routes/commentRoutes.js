const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");

// Middleware (replace `authMiddleware` and `validationMiddleware` with your actual middleware)
const validationMiddleware = require("../middleware/validationMiddleware");

// Routes
router.get("/", commentsController.getAllComments); // Use the new function here to get all comments
router.get("/:id", commentsController.getCommentsByThreadId); // Get comments by thread ID

router.post(
  "/",

  validationMiddleware,
  commentsController.addComment
);
router.put(
  "/:id",

  validationMiddleware,
  commentsController.updateComment
);
router.delete("/:id", commentsController.deleteComment);

module.exports = router;

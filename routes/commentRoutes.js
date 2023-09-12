const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");

// Middleware (replace `authMiddleware` and `validationMiddleware` with your actual middleware)
const authMiddleware = require("../middleware/authMiddleware");
const validationMiddleware = require("../middleware/validationMiddleware");

// Routes
router.get("/", authMiddleware, commentsController.getAllComments); // Apply authentication middleware here as an example
router.get("/:id", authMiddleware, commentsController.getCommentById); // Apply authentication middleware here as an example

router.post(
  "/",
  authMiddleware,
  validationMiddleware,
  commentsController.createComment
); // Apply both authentication and validation middleware here as an example
router.put(
  "/:id",
  authMiddleware,
  validationMiddleware,
  commentsController.updateComment
); // Apply both authentication and validation middleware here as an example
router.delete("/:id", authMiddleware, commentsController.deleteComment); // Apply authentication middleware here as an example

module.exports = router;

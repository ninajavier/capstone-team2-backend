const express = require("express");
const router = express.Router();
const likesController = require("../controllers/likesController");

// Middleware (replace `authMiddleware` and `validationMiddleware` with your actual middleware)
const authMiddleware = require('../middleware/authMiddleware');
const validationMiddleware = require("../middleware/validationMiddleware");

// Routes
router.get("/", authMiddleware, likesController.getAllLikes); // Apply authentication middleware here as an example
router.get("/:id", authMiddleware, likesController.getLikeById); // Apply authentication middleware here as an example

router.post(
  "/",
  authMiddleware,
  validationMiddleware,
  likesController.createLike
); // Apply both authentication and validation middleware here as an example
router.delete("/:id", authMiddleware, likesController.deleteLike); // Apply authentication middleware here as an example

module.exports = router;

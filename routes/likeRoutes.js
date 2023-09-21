const express = require("express");
const router = express.Router();
const likesController = require("../controllers/likesController");

// Middleware (replace `authMiddleware` and `validationMiddleware` with your actual middleware)
const validationMiddleware = require("../middleware/validationMiddleware");

// Routes
router.get("/", likesController.getAllLikes); // Apply authentication middleware here as an example
router.get("/:id", likesController.getLikeById); // Apply authentication middleware here as an example

router.post(
  "/",

  validationMiddleware,
  likesController.createLike
); // Apply both authentication and validation middleware here as an example
router.delete("/:id", likesController.deleteLike); // Apply authentication middleware here as an example

module.exports = router;

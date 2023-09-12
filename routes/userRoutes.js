const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// Middleware (replace `authMiddleware` and `validationMiddleware` with your actual middleware)
const authMiddleware = require("../middleware/authMiddleware");
const validationMiddleware = require("../middleware/validationMiddleware");

// Routes
router.get("/", authMiddleware, usersController.getAllUsers); // Apply authentication middleware here as an example
router.get("/:id", authMiddleware, usersController.getUserById); // Apply authentication middleware here as an example
router.get(
  "/firebase/:uid",
  authMiddleware,
  usersController.getUserByFirebaseUID
); // Apply authentication middleware here as an example

router.post("/", validationMiddleware, usersController.createUser); // Apply validation middleware here as an example
router.put(
  "/:id",
  authMiddleware,
  validationMiddleware,
  usersController.updateUser
); // Apply both authentication and validation middleware here as an example
router.delete("/:id", authMiddleware, usersController.deleteUser); // Apply authentication middleware here as an example

module.exports = router;

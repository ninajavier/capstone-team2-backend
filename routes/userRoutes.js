const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const authMiddleware = require("../middleware/authMiddleware");

// Routes
router.get("/", authMiddleware, usersController.getAllUsers); // Apply authentication middleware here as an example
router.get("/:id", authMiddleware, usersController.getUserById); // Apply authentication middleware here as an example
router.get(
  "/firebase/:uid",
  authMiddleware,
  usersController.getUserByFirebaseUID
); // Apply authentication middleware here as an example

// Routes without middleware
router.post("/", usersController.createUser); // No middleware applied
router.put("/:id", authMiddleware, usersController.updateUser); // Only authentication middleware applied
router.delete("/:id", authMiddleware, usersController.deleteUser); // Apply authentication middleware here as an example

module.exports = router;

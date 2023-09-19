const express = require("express");
const router = express.Router();
const threadsController = require("../controllers/threadsController");

// Middleware (replace `authMiddleware` and `validationMiddleware` with your actual middleware)
const validationMiddleware = require("../middleware/validationMiddleware");

// Routes
router.get("/", threadsController.getAllThreads); // Apply authentication middleware here as an example
router.get("/:id", threadsController.getThreadById); // Apply authentication middleware here as an example

router.post(
  "/",

  validationMiddleware,
  threadsController.createThread
); // Apply both authentication and validation middleware here as an example
router.put(
  "/:id",

  validationMiddleware,
  threadsController.updateThread
); // Apply both authentication and validation middleware here as an example
router.delete("/:id", threadsController.deleteThread); // Apply authentication middleware here as an example

module.exports = router;

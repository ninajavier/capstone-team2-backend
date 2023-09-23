
const threadsController = require('../controllers/threadsController');

// Middleware (replace `authMiddleware` and `validationMiddleware` with your actual middleware)
const authMiddleware = require("../middleware/authMiddleware");
const validationMiddleware = require("../middleware/validationMiddleware");

// Routes
router.get("/", authMiddleware, threadsController.getAllThreads); // Apply authentication middleware here as an example
router.get("/:id", authMiddleware, threadsController.getThreadById); // Apply authentication middleware here as an example

router.post(
  "/",
  authMiddleware,
  validationMiddleware,
  threadsController.createThread
); // Apply both authentication and validation middleware here as an example
router.put(
  "/:id",
  authMiddleware,
  validationMiddleware,
  threadsController.updateThread
); // Apply both authentication and validation middleware here as an example
router.delete("/:id", authMiddleware, threadsController.deleteThread); // Apply authentication middleware here as an example

module.exports = router;

const express = require("express");

console.log("Defining routes"); // Debug log here


const router = express.Router();
const usersController = require("../controllers/usersController");
const authMiddleware = require("../middleware/authMiddleware");

// Routes
router.get("/", async (req, res)  => {
    const users = await usersController.getAllUsers()
    console.log(users);
    res.json({success: true, payload: users});
});
router.get("/:id", authMiddleware, usersController.getUserById);
router.get("/firebase/:uid", authMiddleware, usersController.getUserByFirebaseUID);

// New routes for fetching a user's comments, threads, and likes based on Firebase UID
router.get('/firebase/:uid/comments', authMiddleware, usersController.getUserComments);
router.get('/firebase/:uid/threads', authMiddleware, usersController.getUserThreads);
router.get('/firebase/:uid/likes', authMiddleware, usersController.getUserLikes);

// Routes without middleware
router.post("/", (req, res) => {
    const newUser = req.body
    usersController.createUser(newUser)
});
router.put("/:id", authMiddleware, usersController.updateUser);
router.delete("/:id", authMiddleware, usersController.deleteUser);

module.exports = router;

const express = require("express");

console.log("Defining routes"); // Debug log here


const router = express.Router();
const usersController = require("../controllers/usersController");

// Routes
router.get("/", async (req, res)  => {
    const users = await usersController.getAllUsers()
    console.log(users);
    res.json({success: true, payload: users});
});
router.get("/:id", usersController.getUserById);
router.get("/firebase/:uid", usersController.getUserByFirebaseUID);

// New routes for fetching a user's comments, threads, and likes based on Firebase UID
router.get('/firebase/:uid/comments', usersController.getUserComments);
router.get('/firebase/:uid/threads', usersController.getUserThreads);
router.get('/firebase/:uid/likes', usersController.getUserLikes);

// Routes without middleware
router.post("/", (req, res) => {
    const newUser = req.body
    usersController.createUser(newUser)
});
router.put("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);

module.exports = router;

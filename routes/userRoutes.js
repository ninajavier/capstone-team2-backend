const express = require("express");

console.log("Defining routes"); // Debug log here

const router = express.Router();
const usersController = require("../controllers/usersController");

// Routes
router.get("/", usersController.getAllUsers());
router.get("/:id", (req, res) => usersController.getUserById(req.params.id));


// New routes for fetching a user's comments, threads, and likes based on Firebase UID
router.get('/firebase/:uid/comments', authMiddleware, usersController.getUserComments);
router.get('/firebase/:uid/threads', authMiddleware, usersController.getUserThreads);
router.get('/firebase/:uid/likes', authMiddleware, usersController.getUserLikes);

// Routes without middleware
router.post("/", (req, res) => {
    const newUser = req.body;
    usersController.createUser(newUser).then(response => {
        res.json({ success: true, payload: response });
    }).catch(error => {
        res.json({ success: false, error });
    });
});
router.put("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);

module.exports = router;

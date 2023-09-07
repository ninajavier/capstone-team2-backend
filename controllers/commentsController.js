// commentsController.js

const db = require("../db/dbConfig.js");

// Function to get all comments for a specific route
const getCommentsByRouteId = async (req, res) => {
    try {
        const routeId = req.params.id;
        const comments = await db.any("SELECT * FROM comments WHERE route_id=$1", routeId);

        if (!comments.length) {
            return res.status(404).send('No comments found for this route');
        }

        res.json(comments);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Function to post a new comment for a specific route
const addComment = async (req, res) => {
    try {
        const routeId = req.params.id;
        const { userId, text } = req.body; // Assuming the comment has a user and text. Adjust fields accordingly.

        const newComment = await db.one(
            "INSERT INTO comments (route_id, user_id, text) VALUES($1, $2, $3) RETURNING *",
            [routeId, userId, text]
        );

        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Function to update a comment by ID
const updateComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const { text } = req.body;

        const updatedComment = await db.one(
            "UPDATE comments SET text=$1 WHERE id=$2 RETURNING *",
            [text, commentId]
        );

        res.json(updatedComment);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Function to delete a comment by ID
const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;

        const deletedComment = await db.one(
            "DELETE FROM comments WHERE id=$1 RETURNING *",
            commentId
        );

        res.json({ message: 'Comment deleted successfully', deletedComment });
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    getCommentsByRouteId,
    addComment,
    updateComment,
    deleteComment
};

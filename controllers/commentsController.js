// commentsController.js
const db = require("../config/dbConfig");
const {
  getAllComments,
  getCommentById,
  createComment,
  updateComment, 
  deleteComment, 
} = require("../queries/comments");
const express = require("express");
const comments = express.Router({ mergeParams: true }); // Prepend the thread ID to routes

// Get all comments for a specific thread
comments.get("/", async (req, res) => {
  const threadId = req.params.threadsId; // Get the thread ID from the URL
  try {
    const allComments = await getAllComments(threadId); // Pass the thread ID to fetch comments for that thread
    res.json({ data: allComments, status: 200 });
  } catch (error) {
    res.status(500).json({ error, status: 500 });
  }
});

// Get a comment by ID
comments.get("/:id", async (req, res) => {
  const commentId = req.params.id;
  try {
    const commentById = await getCommentById(commentId);
    console.log(commentById);
    res.json({ data: commentById, status: 200 });
  } catch (error) {
    res.status(500).json({ error, status: 500 });
  }
});

// Create a new comment for a specific thread
comments.post("/", async (req, res) => {
  try {
    const threadId = req.params.threadsId; // Get the thread ID from the URL
    const content  = req.body;

    if (!content) {
      return res.status(400).json({ error: "Content is required", status: 400 });
    }

    // Assuming you have a way to authenticate the user and get their ID, e.g., userEmail
    // const userEmail = req.user.email;
    // const user = await db.one("SELECT id FROM users WHERE email=$1", [userEmail]);

    // Create a new comment for the specified thread and user
    const newComment = await createComment(threadId, content);

    res.status(201).json({ data: newComment, status: 201 });
  } catch (error) {
    res.status(500).json({ error, status: 500 });
  }
});

// Update a comment by ID
comments.put("/:id", async (req, res) => {
  try {
    const commentId = req.params.id;
    const { content } = req.body;

    // Update the comment with the new content
    const updatedComment = await updateComment(commentId, content);

    res.json({ data: updatedComment, status: 200 });
  } catch (error) {
    res.status(500).json({ error, status: 500 });
  }
});

// Delete a comment by ID
comments.delete("/:id", async (req, res) => {
  try {
    const commentId = req.params.id;

    // Delete the comment by ID
    const deletedComment = await deleteComment(commentId);

    res.json({
      message: "Comment deleted successfully",
      data: deletedComment,
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ error, status: 500 });
  }
});

module.exports = comments;

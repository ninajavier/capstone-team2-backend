// commentsController.js

const db = require("../../db/dbConfig.js");

// Function to get all comments for a specific thread
const getCommentsByThreadId = async (req, res) => {
  try {
    const threadId = req.params.id;
    const comments = await db.any(
      "SELECT * FROM comments WHERE thread_id=$1",
      threadId
    );

    if (!comments.length) {
      return res
        .status(404)
        .json({ error: "No comments found for this thread", status: 404 });
    }

    res.json({ data: comments, status: 200 });
  } catch (error) {
    res.status(500).json({ error, status: 500 });
  }
};

// Function to post a new comment for a specific thread
const addComment = async (req, res) => {
  try {
    const threadId = req.params.id;
    const { text } = req.body;
    const firebaseUid = req.user.uid; // Getting UID from the Firebase auth token

    const user = await db.one("SELECT id FROM users WHERE firebase_uid=$1", [
      firebaseUid,
    ]);

    const newComment = await db.one(
      "INSERT INTO comments (thread_id, user_id, text) VALUES($1, $2, $3) RETURNING *",
      [threadId, user.id, text]
    );

    res.status(201).json({ data: newComment, status: 201 });
  } catch (error) {
    res.status(500).json({ error, status: 500 });
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

    res.json({ data: updatedComment, status: 200 });
  } catch (error) {
    res.status(500).json({ error, status: 500 });
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

    res.json({
      message: "Comment deleted successfully",
      data: deletedComment,
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ error, status: 500 });
  }
};

module.exports = {
  getCommentsByThreadId,
  addComment,
  updateComment,
  deleteComment,
};

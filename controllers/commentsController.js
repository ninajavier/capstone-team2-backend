const db = require("../config/dbConfig");
const express = require("express");
const comments = express.Router({ mergeParams: true });

comments.get("/", async (req, res) => {
  const threadId = req.params.threadsId;
  try {
    const allComments = await db.any("SELECT * FROM comments WHERE thread_id = $1", [threadId]);
    res.json({ data: allComments, status: 200 });
  } catch (error) {
    res.status(500).json({ error, status: 500 });
  }
});

comments.get("/:id", async (req, res) => {
  const commentId = req.params.id;
  try {
    const commentById = await db.one("SELECT * FROM comments WHERE id = $1", [commentId]);
    res.json({ data: commentById, status: 200 });
  } catch (error) {
    res.status(500).json({ error, status: 500 });
  }
});

comments.post("/", async (req, res) => {
  try {
    const threadId = req.params.threadsId;
    const content = req.body;

    if (!content) {
      return res.status(400).json({ error: "Content is required", status: 400 });
    }

    const newComment = await db.one(
      "INSERT INTO comments (user_id, content, thread_id) VALUES ($1, $2, $3) RETURNING *",
      [content.user_id, content.content, threadId]
    );

    res.status(201).json({ data: newComment, status: 201 });
  } catch (error) {
    res.status(500).json({ error, status: 500 });
  }
});

comments.put("/:id", async (req, res) => {
  try {
    const commentId = req.params.id;
    const content = req.body;

    const updatedComment = await db.one(
      "UPDATE comments SET user_id = $1, content = $2, thread_id = $3 WHERE id = $4 RETURNING *",
      [content.user_id, content.content, content.thread_id, commentId]
    );

    res.json({ data: updatedComment, status: 200 });
  } catch (error) {
    res.status(500).json({ error, status: 500 });
  }
});

comments.delete("/:id", async (req, res) => {
  try {
    const commentId = req.params.id;
    const deletedComment = await db.one("DELETE FROM comments WHERE id = $1 RETURNING *", [commentId]);

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

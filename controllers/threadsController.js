const express = require("express");
const threads = express.Router();
const db = require("../config/dbConfig");
const commentsController = require("../controllers/commentsController");

threads.use('/:threadsId/comments', commentsController);

threads.get("/", async (_, res) => {
  try {
    const allThreads = await db.any("SELECT * FROM threads");
    res.json({ data: allThreads, status: 200 });
  } catch (error) {
    res.status(500).json({ error, status: 500 });
  }
});

threads.get("/by-train", async (req, res) => {
  const trains = req.query.trains.split(',');
  try {
    const threadsByTrains = await db.any("SELECT * FROM threads WHERE train_line = ANY($1)", [trains]);
    res.json({ data: threadsByTrains, status: 200 });
  } catch (error) {
    res.status(500).json({ error, status: 500 });
  }
});

threads.get("/by-train/:trainId", async (req, res) => {
  const trainId = req.params.trainId;
  try {
    const threadByTrainId = await db.any("SELECT * FROM threads WHERE train_line = $1", [trainId]);
    res.json({ data: threadByTrainId, status: 200 });
  } catch (error) {
    res.status(500).json({ error, status: 500 });
  }
});

threads.get("/:id", async (req, res) => {
  const threadId = req.params.id;
  try {
    const threadById = await db.one("SELECT * FROM threads WHERE id = $1", [threadId]);
    res.json({ data: threadById, status: 200 });
  } catch (error) {
    res.status(500).json({ error, status: 500 });
  }
});

threads.post("/", async (req, res) => {
  try {
    const newThreadInfo = req.body;

    if (!newThreadInfo.title || !newThreadInfo.body) {
      return res.status(400).json({ error: "Title and body are required", status: 400 });
    }

    const newThread = await db.one(
      "INSERT INTO threads (user_id, train_line, station, title, body, rating, photo_url, is_favorite, tags) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        newThreadInfo.user_id,
        newThreadInfo.train_line,
        newThreadInfo.station,
        newThreadInfo.title,
        newThreadInfo.body,
        newThreadInfo.rating,
        newThreadInfo.photo_url,
        newThreadInfo.is_favorite,
        newThreadInfo.tags,
      ]
    );
    res.status(201).json({ data: newThread, status: 201 });
  } catch (error) {
    res.status(500).json({ error, status: 500 });
  }
});

threads.put("/:id", async (req, res) => {
  try {
    const threadId = req.params.id;
    const newThreadInfo = req.body;

    const updatedThread = await db.one(
      "UPDATE threads SET title=$1, body=$2 WHERE id=$3 RETURNING *",
      [newThreadInfo.title, newThreadInfo.body, threadId]
    );

    res.json({ data: updatedThread, status: 200 });
  } catch (error) {
    if (error.message === "No data returned from the query.") {
      res.status(404).json({ error: "Thread not found", status: 404 });
    } else {
      res.status(500).json({ error, status: 500 });
    }
  }
});

threads.delete("/:id", async (req, res) => {
  try {
    const threadId = req.params.id;
    const deletedThread = await db.one("DELETE FROM threads WHERE id = $1 RETURNING *", [threadId]);
    res.json({
      message: "Thread deleted successfully",
      data: deletedThread,
      status: 200,
    });
  } catch (error) {
    if (error.message === "No data returned from the query.") {
      res.status(404).json({ error: "Thread not found", status: 404 });
    } else {
      res.status(500).json({ error, status: 500 });
    }
  }
});

module.exports = threads;

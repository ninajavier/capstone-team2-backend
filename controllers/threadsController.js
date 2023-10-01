const express = require("express");
const threads = express.Router();
const db = require("../config/dbConfig");
const {
  getAllThreads,
  getThreadById,
  getThreadsByTrainId,
  getThreadsByTrains,
  createThread,
  updateThread,
  deleteThread,
} = require("../queries/threads");
const commentsController = require("../controllers/commentsController");

// Mount commentsController as a sub-router for comments
threads.use('/:threadsId/comments', commentsController);

// Get all threads
threads.get("/", async (_, res) => {
  try {
    const allThreads = await getAllThreads();
    res.json({ data: allThreads, status: 200 });
  } catch (error) {
    res.status(500).json({ error, status: 500 });
  }
});

// // Get threads by multiple train_id 's
// threads.get("/by-train", async (req, res) => {
//   const trains = req.body;
//   console.log(trains, 'testing the by-train route')
//   try {
//     const threadsByTrains = await getThreadsByTrains(trains);
//     res.json({ data: threadsByTrains, status: 200 });
//   } catch (error) {
//     res.status(500).json({ error, status: 500 });
//   }
// })

threads.get("/by-train", async (req, res) => {
  const trains = req.query.trains.split(''); // Use req.query to get multiple train_ids
  try {
    const threadsByTrains = await getThreadsByTrains(trains);
    res.json({ data: threadsByTrains, status: 200 });
  } catch (error) {
    res.status(500).json({ error, status: 500 });
  }
});

// Get a thread by train_id
threads.get("/by-train/:trainId", async (req, res) => {
  const trainId = req.params.trainId;
  console.log(trainId);
  try {
    const threadByTrainId = await getThreadsByTrainId(trainId);
    res.json({ data: threadByTrainId, status: 200 });
  } catch (error) {
    res.status(500).json({ error, status: 500 });
  }
});

// Get a thread by ID
threads.get("/:id", async (req, res) => {
  const threadId = req.params.id;
  try {
    const threadById = await getThreadById(threadId);
    console.log(threadById);
    res.json({ data: threadById, status: 200 });
  } catch (error) {
    res.status(500).json({ error, status: 500 });
  }
});


// Create a new thread
threads.post("/", async (req, res) => {
  try {
    const newThreadInfo = req.body;

    if (!newThreadInfo.title || !newThreadInfo.body) {
      return res.status(400).json({ error: "Title and body are required", status: 400 });
    }

    // Add authentication logic here if needed

    const newThread = await createThread(newThreadInfo);
    res.status(201).json({ data: newThread, status: 201 });
  } catch (error) {
    res.status(500).json({ error, status: 500 });
  }
});

// Update a thread by ID
threads.put("/:id", async (req, res) => {
  try {
    const threadId = req.params.id;
    const newThreadInfo = req.body;

    const updatedThread = await updateThread(threadId, newThreadInfo);

    res.json({ data: updatedThread, status: 200 });
  } catch (error) {
    if (error.message === "No data returned from the query.") {
      res.status(404).json({ error: "Thread not found", status: 404 });
    } else {
      res.status(500).json({ error, status: 500 });
    }
  }
});

// Delete a thread by ID
threads.delete("/:id", async (req, res) => {
  try {
    const threadId = req.params.id;
    const deletedThread = await deleteThread(threadId);
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

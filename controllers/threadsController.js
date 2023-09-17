const db = require("../config/dbConfig");

// Get all threads
const getAllThreads = async (req, res) => {
  try {
    const threads = await db.any("SELECT * FROM threads");
    res.json({ data: threads, status: 200 });
  } catch (error) {
    res.status(500).json({ error, status: 500 });
  }
};

// Get a thread by ID
const getThreadById = async (req, res) => {
  try {
    const threadId = req.params.id;
    const thread = await db.one("SELECT * FROM threads WHERE id=$1", threadId);
    res.json({ data: thread, status: 200 });
  } catch (error) {
    if (error.message === "No data returned from the query.") {
      res.status(404).json({ error: "Thread not found", status: 404 });
    } else {
      res.status(500).json({ error, status: 500 });
    }
  }
};

// Create a new thread
// Create a new thread
const createThread = async (req, res) => {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({ error: "Title and body are required", status: 400 });
    }

    const firebaseUid = req.user?.uid; // Getting UID from the Firebase auth token

    if (!firebaseUid) {
      return res.status(400).json({ error: "User is not authenticated", status: 400 });
    }

    let user;
    try {
      user = await db.one("SELECT id FROM users WHERE firebase_uid=$1", [firebaseUid]);
    } catch (error) {
      if (error.message === "No data returned from the query.") {
        return res.status(404).json({ error: "User not found", status: 404 });
      }
      throw error; // re-throw the error if it's not the expected "not found" error
    }

    const newThread = await db.one(
      "INSERT INTO threads (title, body, user_id) VALUES($1, $2, $3) RETURNING *",
      [title, body, user.id]
    );

    res.status(201).json({ data: newThread, status: 201 });
  } catch (error) {
    res.status(500).json({ error, status: 500 });
  }
};


// Update a thread by ID
const updateThread = async (req, res) => {
  try {
    const threadId = req.params.id;
    const { title, body } = req.body;

    const updatedThread = await db.one(
      "UPDATE threads SET title=$1, body=$2 WHERE id=$3 RETURNING *",
      [title, body, threadId]
    );

    res.json({ data: updatedThread, status: 200 });
  } catch (error) {
    if (error.message === "No data returned from the query.") {
      res.status(404).json({ error: "Thread not found", status: 404 });
    } else {
      res.status(500).json({ error, status: 500 });
    }
  }
};

// Delete a thread by ID
const deleteThread = async (req, res) => {
  try {
    const threadId = req.params.id;
    const deletedThread = await db.one(
      "DELETE FROM threads WHERE id=$1 RETURNING *",
      threadId
    );
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
};

module.exports = {
  getAllThreads,
  getThreadById,
  createThread,
  updateThread,
  deleteThread,
};

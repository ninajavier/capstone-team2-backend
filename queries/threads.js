const db = require("../config/dbConfig.js");

// INDEX - Get all threads
const getAllThreads = async () => {
  try {
    const allThreads = await db.any("SELECT * FROM threads");
    return allThreads;
  } catch (error) {
    return error;
  }
};

// SHOW - Get single thread by ID
const getThreadById = async (id) => {
  try {
    const thread = await db.one("SELECT * FROM threads WHERE id=$1", id);
    return thread;
  } catch (error) {
    return error;
  }
};

// CREATE - Add new thread
const createThread = async (thread) => {
  try {
    const newThread = await db.one(
      "INSERT INTO threads (user_id, title, body) VALUES($1, $2, $3) RETURNING *", 
      [thread.user_id, thread.title, thread.body]
    );
    return newThread;
  } catch (error) {
    return error;
  }
};


// UPDATE - Update a thread by ID
const updateThread = async (id, thread) => {
  const {title, body} = thread;
  try {
    const updatedThread = await db.one(
      "UPDATE threads SET title=$1, body=$2 WHERE id=$3 RETURNING *",
      [title, body, id]
    );
    return updatedThread;
  } catch (error) {
    return error;
  }
};

// DELETE - Remove a thread by ID
const deleteThread = async (id) => {
  try {
    const deletedThread = await db.one(
      "DELETE FROM threads WHERE id = $1 RETURNING *", 
      [id]
    );
    return deletedThread;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllThreads,
  getThreadById,
  createThread,
  updateThread,
  deleteThread,
};

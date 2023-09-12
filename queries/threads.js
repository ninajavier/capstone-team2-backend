const db = require("../db/dbConfig.js");

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
const createThread = async (thread, firebase_uid) => {
  try {
    const newThread = await db.one(
      "INSERT INTO threads (comment_id, firebase_uid, content) VALUES($1, $2, $3) RETURNING *", 
      [thread.comment_id, firebase_uid, thread.content]
    );
    return newThread;
  } catch (error) {
    return error;
  }
};

// UPDATE - Update a thread by ID
const updateThread = async (id, thread, firebase_uid) => {
  try {
    const updatedThread = await db.one(
      "UPDATE threads SET comment_id=$1, content=$2 WHERE id=$3 AND firebase_uid=$4 RETURNING *",
      [thread.comment_id, thread.content, id, firebase_uid]
    );
    return updatedThread;
  } catch (error) {
    return error;
  }
};

// DELETE - Remove a thread by ID
const deleteThread = async (id, firebase_uid) => {
  try {
    const deletedThread = await db.one(
      "DELETE FROM threads WHERE id = $1 AND firebase_uid = $2 RETURNING *", 
      [id, firebase_uid]
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

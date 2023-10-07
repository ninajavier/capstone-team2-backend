const db = require("../config/dbConfig");

const getAllThreads = async () => {
  try {
    const threads = await db.any("SELECT * FROM threads");
    return { status: 200, data: threads };
  } catch (error) {
    console.error(error);
    return { status: 500, error: 'Server error' };
  }
};

const getThreadById = async (id) => {
  try {
    const thread = await db.one("SELECT * FROM threads WHERE id=$1", id);
    return { status: 200, data: thread };
  } catch (error) {
    console.error(error);
    return { status: 500, error: 'Server error' };
  }
};

const getThreadsByTrainId = async (train_id) => {
  try { 
    const threads = await db.any("SELECT * FROM threads WHERE train_line=$1", train_id);
    return { status: 200, data: threads };
  } catch (error) {
    console.error(error);
    return { status: 500, error: 'Server error' };
  }
};

const getThreadsByTrains = async (trains) => {
  try { 
    const threads = await db.any("SELECT * FROM threads WHERE train_line IN ($1, $2)", trains);
    return { status: 200, data: threads };
  } catch (error) {
    console.error(error);
    return { status: 500, error: 'Server error' };
  }
};

const createThread = async (thread) => {
  try {
    const newThread = await db.one(
      "INSERT INTO threads (user_id, train_line, station, title, body, rating, photo_url, is_favorite, tags) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        thread.user_id,
        thread.train_line,
        thread.station,
        thread.title,
        thread.body,
        thread.rating,
        thread.photo_url,
        thread.is_favorite,
        thread.tags,
      ]
    );
    return { status: 201, data: newThread };
  } catch (error) {
    console.error(error);
    return { status: 500, error: 'Server error' };
  }
};

const updateThread = async (id, thread) => {
  const {title, body} = thread;
  try {
    const updatedThread = await db.one(
      "UPDATE threads SET title=$1, body=$2 WHERE id=$3 RETURNING *",
      [title, body, id]
    );
    return { status: 200, data: updatedThread };
  } catch (error) {
    console.error(error);
    if (error.message === "No data returned from the query.") {
      return { status: 404, error: 'Thread not found' };
    } else {
      return { status: 500, error: 'Server error' };
    }
  }
};

const deleteThread = async (id) => {
  try {
    const deletedThread = await db.one(
      "DELETE FROM threads WHERE id = $1 RETURNING *", 
      [id]
    );
    return { status: 200, data: deletedThread };
  } catch (error) {
    console.error(error);
    if (error.message === "No data returned from the query.") {
      return { status: 404, error: 'Thread not found' };
    } else {
      return { status: 500, error: 'Server error' };
    }
  }
};

module.exports = {
  getAllThreads,
  getThreadById,
  getThreadsByTrainId,
  getThreadsByTrains,
  createThread,
  updateThread,
  deleteThread,
};

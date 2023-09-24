const db = require("../db/dbConfig.js");

// INDEX - Get all likes
const getAllLikes = async () => {
  try {
    const allLikes = await db.any("SELECT * FROM likes");
    return { data: allLikes, status: 200 };
  } catch (error) {
    console.error(error);
    return { error: 'Server error', status: 500 };
  }
};

// SHOW - Get single like by ID
const getLikeById = async (id) => {
  try {
    const like = await db.one("SELECT * FROM likes WHERE id=$1", id);
    return { data: like, status: 200 };
  } catch (error) {
    console.error(error);
    return { error: 'Like not found', status: 404 };
  }
};

// SHOW - Get all likes for a specific thread
const getLikesByThreadId = async (thread_id) => {
  try {
    const likes = await db.any("SELECT * FROM likes WHERE thread_id=$1", thread_id);
    return { data: likes, status: 200 };
  } catch (error) {
    console.error(error);
    return { error: 'Likes not found', status: 404 };
  }
};

// CREATE - Add new like
const createLike = async (like) => {
  try {
    const newLike = await db.one(
      "INSERT INTO likes (thread_id) VALUES($1) RETURNING *", 
      [like.thread_id]
    );
    return { data: newLike, status: 201 };
  } catch (error) {
    console.error(error);
    return { error: 'Could not create like', status: 400 };
  }
};

// DELETE - Remove a like by ID
const deleteLike = async (id) => {
  try {
    const deletedLike = await db.one(
      "DELETE FROM likes WHERE id = $1 RETURNING *", 
      [id]
    );
    return { data: deletedLike, status: 200 };
  } catch (error) {
    console.error(error);
    if (error.message === 'No data returned from the query.') {
      return { error: 'Like not found', status: 404 };
    }
    return { error: 'Server error', status: 500 };
  }
};

module.exports = {
  getAllLikes,
  getLikeById,
  getLikesByThreadId,
  createLike,
  deleteLike,
};

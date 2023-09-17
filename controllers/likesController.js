const db = require("../config/dbConfig");

// INDEX - Get all likes
const getAllLikes = async () => {
  try {
    const allLikes = await db.any("SELECT * FROM likes");
    return { data: allLikes, status: 200 };
  } catch (error) {
    console.error(error);
    return { error: "Server error", status: 500 };
  }
};

// SHOW - Get a single like by ID
const getLikeById = async (id) => {
  try {
    const like = await db.one("SELECT * FROM likes WHERE id=$1", id);
    return { data: like, status: 200 };
  } catch (error) {
    console.error(error);
    return { error: "Like not found", status: 404 };
  }
};

// SHOW - Get all likes by thread ID
const getLikesByThreadId = async (thread_id) => {
  try {
    const likesByThread = await db.any(
      "SELECT * FROM likes WHERE thread_id=$1",
      thread_id
    );
    return { data: likesByThread, status: 200 };
  } catch (error) {
    console.error(error);
    return { error: "No likes found for this thread", status: 404 };
  }
};

// CREATE - Create a new like
const createLike = async (req, res) => {
  try {
    const { thread_id, comment_id, like_type } = req.body;
    const firebaseUid = req.user.uid; // Getting UID from the Firebase auth token

    const user = await db.one("SELECT id FROM users WHERE firebase_uid=$1", [
      firebaseUid,
    ]);

    const newLike = await db.one(
      "INSERT INTO likes (user_id, thread_id, comment_id, like_type) VALUES($1, $2, $3, $4) RETURNING *",
      [user.id, thread_id, comment_id, like_type]
    );

    res.status(201).json({ data: newLike, status: 201 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", status: 500 });
  }
};

// DELETE - Delete a like by ID
const deleteLike = async (req, res) => {
  try {
    const likeId = req.params.id;

    const deletedLike = await db.one(
      "DELETE FROM likes WHERE id = $1 RETURNING *",
      [likeId]
    );

    res.json({ data: deletedLike, status: 200 });
  } catch (error) {
    console.error(error);
    if (error.message === "No data returned from the query.") {
      res.status(404).json({ error: "Like not found", status: 404 });
      return;
    }
    res.status(500).json({ error: "Server error", status: 500 });
  }
};

module.exports = {
  getAllLikes,
  getLikeById,
  getLikesByThreadId,
  createLike,
  deleteLike,
};

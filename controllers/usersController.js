const db = require("../config/dbConfig");

console.log("usersController file loaded");

const getUserComments = async (req, res) => {
  try {
    console.log("getUserComments called"); // Debug log here
    const { uid } = req.params;
    const userData = await db.any('SELECT * FROM comments WHERE user_id = (SELECT id FROM users WHERE firebase_uid = $1)', [uid]);
    res.status(200).json({ status: 200, data: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Server error' });
  }
};

const getUserThreads = async (req, res) => {
  try {
    console.log("getUserThreads called"); // Debug log here
    const { uid } = req.params;
    const userData = await db.any('SELECT * FROM threads WHERE user_id = (SELECT id FROM users WHERE firebase_uid = $1)', [uid]);
    res.status(200).json({ status: 200, data: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Server error' });
  }
};

const getUserLikes = async (req, res) => {
  try {
    console.log("getUserLikes called"); // Debug log here
    const { uid } = req.params;
    const userData = await db.any('SELECT * FROM likes WHERE user_id = (SELECT id FROM users WHERE firebase_uid = $1)', [uid]);
    res.status(200).json({ status: 200, data: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Server error' });
  }
};

const getAllUsers = async () => {
  try {
    const allUsers = await db.any("SELECT * FROM users");
    console.log(allUsers);
    return { data: allUsers, status: 200 };
  } catch (error) {
    console.error(error);
    return { error: "Server error", status: 500 };
  }
};

const getUserById = async (id) => {
  try {
    const user = await db.one("SELECT * FROM users WHERE id=$1", id);
    return { data: user, status: 200 };
  } catch (error) {
    console.error(error);
    return { error: "User not found", status: 404 };
  }
};

const getUserByFirebaseUID = async (req, res) => {
  try {
    const { uid } = req.params;
    const userData = await db.one('SELECT * FROM users WHERE firebase_uid = $1', [uid]);
    res.json({ status: 200, data: userData });
  } catch (error) {
    console.error(error);
    res.status(404).json({ status: 404, error: 'User not found' });
  }
};

const createUser = async (user) => {
  console.log("testing route", user)
  try {
    const newUser = await db.one(
      "INSERT INTO users (firebase_uid, username, email, profile_photo, bio) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [
        user.firebase_uid,
        user.username,
        user.email,
        user.profile_photo,
        user.bio,
      ]
    );
    console.log("new user", newUser)
    return { data: newUser, status: 200 };
  } catch (error) {
    console.error(error);
    return { error: "Server error", status: 500 };
  }
};

const updateUser = async (id, user) => {
  try {
    const updatedUser = await db.one(
      "UPDATE users SET username=$1, email=$2, profile_photo=$3, bio=$4 WHERE id=$5 RETURNING *",
      [user.username, user.email, user.profile_photo, user.bio, id]
    );
    return { data: updatedUser, status: 200 };
  } catch (error) {
    console.error(error);
    return { error: "Could not update user", status: 400 };
  }
};

const deleteUser = async (id) => {
  try {
    const deletedUser = await db.one(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    return { data: deletedUser, status: 200 };
  } catch (error) {
    console.error(error);
    if (error.message === "No data returned from the query.") {
      return { error: "User not found", status: 404 };
    }
    return { error: "Server error", status: 500 };
  }
};

const getUserActivity = async (id) => {
  try {
    const comments = await db.any("SELECT * FROM comments WHERE user_id = $1", [id]);
    const threads = await db.any("SELECT * FROM threads WHERE user_id = $1", [id]);
    const likes = await db.any("SELECT * FROM likes WHERE user_id = $1", [id]);
    return {
      data: {
        comments,
        threads,
        likes,
      },
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return { error: "Could not fetch user activity", status: 500 };
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByFirebaseUID,
  createUser,
  updateUser,
  deleteUser,
  getUserActivity,
  getUserComments,
  getUserThreads,
  getUserLikes,
};

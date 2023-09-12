const db = require("../../db/dbConfig.js");

// INDEX - Get all users
const getAllUsers = async () => {
  try {
    const allUsers = await db.any("SELECT * FROM users");
    return { data: allUsers, status: 200 };
  } catch (error) {
    console.error(error);
    return { error: "Server error", status: 500 };
  }
};

// SHOW - Get single user by ID
const getUserById = async (id) => {
  try {
    const user = await db.one("SELECT * FROM users WHERE id=$1", id);
    return { data: user, status: 200 };
  } catch (error) {
    console.error(error);
    return { error: "User not found", status: 404 };
  }
};

// SHOW - Get single user by Firebase UID
const getUserByFirebaseUID = async (uid) => {
  try {
    const user = await db.one("SELECT * FROM users WHERE firebase_uid=$1", [
      uid,
    ]);
    return { data: user, status: 200 };
  } catch (error) {
    console.error(error);
    return { error: "User not found", status: 404 };
  }
};

// CREATE - Add new user
const createUser = async (user) => {
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
    return { data: newUser, status: 200 };
  } catch (error) {
    console.error(error);
    return { error: "Server error", status: 500 };
  }
};

// UPDATE - Update a user by ID
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

// DELETE - Remove a user by ID
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

// ACTIVITY - Get a user's activity by their ID
const getUserActivity = async (id) => {
  try {
    const comments = await db.any("SELECT * FROM comments WHERE user_id = $1", [
      id,
    ]);
    const threads = await db.any("SELECT * FROM threads WHERE user_id = $1", [
      id,
    ]);
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
};

const db = require("../config/dbConfig");

console.log("usersController file loaded");

// Get all users
const getAllUsers = async () => {
  try {
    const users = await db.any('SELECT * FROM users');
    return { status: 200, data: users };
  } catch (error) {
    console.error(error);
    return { status: 500, error: 'Server error' };
  }
};

// Get user by ID
const getUserById = async (id) => {
  try {
    const userData = await db.one('SELECT * FROM users WHERE id = $1', [id]);
    return { status: 200, data: userData };
  } catch (error) {
    console.error(error);
    return { status: 404, error: 'User not found' };
  }
};

// Get user comments by ID
const getUserComments = async (id) => {
  try {
    // Modify the SQL query according to your database structure
    const userComments = await db.any('SELECT * FROM comments WHERE user_id = $1', [id]); 
    return { status: 200, data: userComments };
  } catch (error) {
    console.error(error);
    return { status: 500, error: 'Server error' };
  }
};

// Get user threads by ID
const getUserThreads = async (id) => {
  try {
    // Modify the SQL query according to your database structure
    const userThreads = await db.any('SELECT * FROM threads WHERE user_id = $1', [id]); 
    return { status: 200, data: userThreads };
  } catch (error) {
    console.error(error);
    return { status: 500, error: 'Server error' };
  }
};

// Get user likes by ID
const getUserLikes = async (id) => {
  try {
    // Modify the SQL query according to your database structure
    const userLikes = await db.any('SELECT * FROM likes WHERE user_id = $1', [id]); 
    return { status: 200, data: userLikes };
  } catch (error) {
    console.error(error);
    return { status: 500, error: 'Server error' };
  }
};

// Create a new user
const createUser = async (user) => {
  try {
    const newUser = await db.one(
      "INSERT INTO users (username, email, profile_photo, bio) VALUES($1, $2, $3, $4) RETURNING *",
      [
        user.username,
        user.email,
        user.profile_photo,
        user.bio,
      ]
    );
    return { status: 200, data: newUser };
  } catch (error) {
    console.error(error);
    return { status: 500, error: "Server error" };
  }
};

// Update a user by ID
const updateUser = async (id, user) => {
  try {
    const updatedUser = await db.one(
      "UPDATE users SET username=$1, email=$2, profile_photo=$3, bio=$4 WHERE id=$5 RETURNING *",
      [
        user.username,
        user.email,
        user.profile_photo,
        user.bio,
        id,
      ]
    );
    return { status: 200, data: updatedUser };
  } catch (error) {
    console.error(error);
    return { status: 500, error: "Server error" };
  }
};

// Delete a user by ID
const deleteUser = async (id) => {
  try {
    const deletedUser = await db.one(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    return { status: 200, data: deletedUser };
  } catch (error) {
    console.error(error);
    if (error.message === "No data returned from the query.") {
      return { status: 404, error: "User not found" };
    }
    return { status: 500, error: "Server error" };
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserComments,
  getUserThreads,
  getUserLikes,
  createUser,
  updateUser,
  deleteUser,
};

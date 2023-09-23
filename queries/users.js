const db = require("../db/dbConfig.js");

// INDEX - Get all users
const getAllUsers = async () => {
  try {
    const allUsers = await db.any("SELECT * FROM users");
    return { data: allUsers, status: 200 };
  } catch (error) {
    console.error(error);
    return { error: 'Server error', status: 500 };
  }
};

// SHOW - Get single user by ID
const getUserById = async (id) => {
  try {
    const user = await db.one("SELECT * FROM users WHERE id=$1", id);
    return { data: user, status: 200 };
  } catch (error) {
    console.error(error);
    return { error: 'User not found', status: 404 };
  }
};

// CREATE - Add new user
const createUser = async (user) => {
  try {
    const newUser = await db.one(
      "INSERT INTO users (username, email, profile_photo, bio, likes) VALUES($1, $2, $3, $4, $5) RETURNING *", 
      [user.username, user.email, user.profile_photo, user.bio, user.likes]
    );
    return { data: newUser, status: 201 };
  } catch (error) {
    console.error(error);
    return { error, status: 400 };
  }
};

// UPDATE - Update a user by ID
const updateUser = async (id, user) => {
  try {
    const updatedUser = await db.one(
      `UPDATE users 
       SET username=$1, 
           email=$2, 
           profile_photo=$3, 
           bio=$4, 
           likes=$5
       WHERE id=$6 RETURNING *`,
      [
        user.username, 
        user.email, 
        user.profile_photo, 
        user.bio, 
        user.likes, 
        id
      ]
    );
    return { data: updatedUser, status: 200 };
  } catch (error) {
    console.error(error);
    return { error: 'Could not update user', status: 400 };
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
    if (error.message === 'No data returned from the query.') {
      return { error: 'User not found', status: 404 };
    }
    return { error: 'Server error', status: 500 };
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

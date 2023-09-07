const db = require("../db/dbConfig.js");

// INDEX - Get all users
const getAllUsers = async () => {
  try {
    const allUsers = await db.any("SELECT * FROM users");
    return allUsers;
  } catch (error) {
    return error;
  }
};

// SHOW - Get single user by ID
const getUserById = async (id) => {
  try {
    const user = await db.one("SELECT * FROM users WHERE id=$1", id);
    return user;
  } catch (error) {
    return error;
  }
};

// CREATE - Add new user
const createUser = async (user) => {
  try {
    const newUser = await db.one(
      "INSERT INTO users (name, email) VALUES($1, $2) RETURNING *", 
      [user.name, user.email]
    );
    return newUser;
  } catch (error) {
    return error;
  }
};

// UPDATE - Update a user by ID
const updateUser = async (id, user) => {
  try {
    const updatedUser = await db.one(
      "UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *",
      [user.name, user.email, id]
    );
    return updatedUser;
  } catch (error) {
    return error;
  }
};

// DELETE - Remove a user by ID
const deleteUser = async (id) => {
  try {
    const deletedUser = await db.one(
      "DELETE FROM users WHERE id = $1 RETURNING *", 
      id
    );
    return deletedUser;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

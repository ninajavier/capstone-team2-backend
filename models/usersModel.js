const dbQueries = require('./queries/users.js');

// Function to get all users
const getAllUsers = async () => {
    return dbQueries.getAllUsers();
};

// Function to get a user by ID
const getUserById = async (id) => {
    return dbQueries.getUserById(id);
};

// Function to create a new user
const createUser = async (user) => {
    return dbQueries.createUser(user);
};

// Function to update a user by ID
const updateUser = async (id, user) => {
    return dbQueries.updateUser(id, user);
};

// Function to delete a user by ID
const deleteUser = async (id) => {
    return dbQueries.deleteUser(id);
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};

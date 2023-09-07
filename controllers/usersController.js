// usersController.js

const db = require("../db/dbConfig.js");

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await db.any("SELECT * FROM users");
        res.json(users);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a user by ID
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await db.one("SELECT * FROM users WHERE id=$1", userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.json(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Create a new user
const createUser = async (req, res) => {
    try {
        // Adjust for your column names and match them with req.body's content.
        const newUser = await db.one(
            "INSERT INTO users (/* your column names */) VALUES(/* your $ placeholders */) RETURNING *",
            [ /* values from req.body */ ]
        );

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a user by ID
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = await db.one(
            "UPDATE users SET /* your column=value, column2=value2, etc. */ WHERE id=$1 RETURNING *",
            [ /* updated values from req.body, userId */ ]
        );

        if (!updatedUser) {
            return res.status(404).send('User not found');
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await db.one("DELETE FROM users WHERE id=$1 RETURNING *", userId);

        if (!deletedUser) {
            return res.status(404).send('User not found');
        }

        res.json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};

// threadsController.js

const db = require("../db/dbConfig.js");

// Get all threads
const getAllThreads = async (req, res) => {
    try {
        const threads = await db.any("SELECT * FROM threads");
        res.json(threads);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a thread by ID
const getThreadById = async (req, res) => {
    try {
        const threadId = req.params.id;
        const thread = await db.one("SELECT * FROM threads WHERE id=$1", threadId);

        if (!thread) {
            return res.status(404).send('Thread not found');
        }

        res.json(thread);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Create a new thread
const createThread = async (req, res) => {
    try {
        // Adjust for your column names and match them with req.body's content.
        const newThread = await db.one(
            "INSERT INTO threads (/* your column names */) VALUES(/* your $ placeholders */) RETURNING *",
            [ /* values from req.body */ ]
        );

        res.status(201).json(newThread);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a thread by ID
const updateThread = async (req, res) => {
    try {
        const threadId = req.params.id;
        const updatedThread = await db.one(
            "UPDATE threads SET /* your column=value, column2=value2, etc. */ WHERE id=$1 RETURNING *",
            [ /* updated values from req.body, threadId */ ]
        );

        if (!updatedThread) {
            return res.status(404).send('Thread not found');
        }

        res.json(updatedThread);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Delete a thread by ID
const deleteThread = async (req, res) => {
    try {
        const threadId = req.params.id;
        const deletedThread = await db.one("DELETE FROM threads WHERE id=$1 RETURNING *", threadId);

        if (!deletedThread) {
            return res.status(404).send('Thread not found');
        }

        res.json({ message: 'Thread deleted successfully', deletedThread });
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    getAllThreads,
    getThreadById,
    createThread,
    updateThread,
    deleteThread
};

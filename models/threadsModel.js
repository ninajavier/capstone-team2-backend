const dbQueries = require('./queries/threads.js');

// Function to get all threads
const getAllThreads = async () => {
    return dbQueries.getAllThreads();
};

// Function to get a thread by ID
const getThreadById = async (id) => {
    return dbQueries.getThreadById(id);
};

// Function to create a new thread
const createThread = async (thread) => {
    return dbQueries.createThread(thread);
};

// Function to update a thread by ID
const updateThread = async (id, thread) => {
    return dbQueries.updateThread(id, thread);
};

// Function to delete a thread by ID
const deleteThread = async (id) => {
    return dbQueries.deleteThread(id);
};

module.exports = {
    getAllThreads,
    getThreadById,
    createThread,
    updateThread,
    deleteThread,
};

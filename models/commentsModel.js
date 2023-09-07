const dbQueries = require('./queries/comments.js');

// Function to get all comments
const getAllComments = async () => {
    return dbQueries.getAllComments();
};

// Function to get a comment by ID
const getCommentById = async (id) => {
    return dbQueries.getCommentById(id);
};

// Function to create a new comment
const createComment = async (comment) => {
    return dbQueries.createComment(comment);
};

// Function to update a comment by ID
const updateComment = async (id, comment) => {
    return dbQueries.updateComment(id, comment);
};

// Function to delete a comment by ID
const deleteComment = async (id) => {
    return dbQueries.deleteComment(id);
};

module.exports = {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
};

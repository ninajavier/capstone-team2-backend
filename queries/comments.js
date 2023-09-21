const db = require("../db/dbConfig.js");

// INDEX - Get all comments
const getAllComments = async () => {
  try {
    const allComments = await db.any("SELECT * FROM comments");
    return allComments;
  } catch (error) {
    return error;
  }
};

// SHOW - Get single comment by ID
const getCommentById = async (id) => {
  try {
    const comment = await db.one("SELECT * FROM comments WHERE id=$1", id);
    return comment;
  } catch (error) {
    return error;
  }
};

// Get all comments by a specific user ID
const getCommentsByUserId = async (userId) => {
  try {
    const userComments = await db.any("SELECT * FROM comments WHERE user_id = $1", [userId]);
    return userComments;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// CREATE - Add a new comment
const createComment = async (comment) => {
  try {
    const newComment = await db.one(
      "INSERT INTO comments (user_id, content, route_id) VALUES($1, $2, $3) RETURNING *", 
      [comment.user_id, comment.content, comment.route_id]
    );
    return newComment;
  } catch (error) {
    return error;
  }
};

// UPDATE - Update a comment by ID
const updateComment = async (id, comment) => {
  try {
    const updatedComment = await db.one(
      "UPDATE comments SET user_id=$1, content=$2, route_id=$3 WHERE id=$4 RETURNING *",
      [comment.user_id, comment.content, comment.route_id, id]
    );
    return updatedComment;
  } catch (error) {
    return error;
  }
};

// DELETE - Remove a comment by ID
const deleteComment = async (id) => {
  try {
    const deletedComment = await db.one(
      "DELETE FROM comments WHERE id = $1 RETURNING *", 
      id
    );
    return deletedComment;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
  getCommentsByUserId, 
};

const db = require("../config/dbConfig");

// Get all posts
const getAllPosts = async () => {
  const query = "SELECT * FROM posts";
  const { rows } = await db.query(query);
  return rows;
};

// Get a post by ID
const getPostById = async (postId) => {
  const query = "SELECT * FROM posts WHERE id = $1";
  const { rows } = await db.query(query, [postId]);
  return rows[0];
};

// Create a new post
const createPost = async (post) => {
  const {
    user_id,
    train_line,
    station,
    title,
    body,
    rating,
    photo_url,
    tags,
  } = post;
  const query =
    "INSERT INTO posts (user_id, train_line, station, title, body, rating, photo_url, tags) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
  const values = [user_id, train_line, station, title, body, rating, photo_url, tags];
  const { rows } = await db.query(query, values);
  return rows[0];
};

// Update a post by ID
const updatePost = async (postId, newPostInfo) => {
  const query =
    "UPDATE posts SET train_line = $1, station = $2, title = $3, body = $4, rating = $5, photo_url = $6, tags = $7, updated_at = CURRENT_TIMESTAMP WHERE id = $8 RETURNING *";
  const values = [
    newPostInfo.train_line,
    newPostInfo.station,
    newPostInfo.title,
    newPostInfo.body,
    newPostInfo.rating,
    newPostInfo.photo_url,
    newPostInfo.tags,
    postId,
  ];
  const { rows } = await db.query(query, values);
  return rows[0];
};

// Delete a post by ID
const deletePost = async (postId) => {
  const query = "DELETE FROM posts WHERE id = $1 RETURNING *";
  const { rows } = await db.query(query, [postId]);
  return rows[0];
};

// Get posts by tags
const getPostsByTag = async (tag) => {
  const query = "SELECT * FROM posts WHERE $1 = ANY(tags)";
  const { rows } = await db.query(query, [tag]);
  return rows;
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getPostsByTag,
};

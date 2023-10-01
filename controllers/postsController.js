const {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    getPostsByTag,
  } = require("../queries/posts");
  
  // Get all posts
  const getAllPostsController = async (_, res) => {
    try {
      const allPosts = await getAllPosts();
      res.json({ data: allPosts, status: 200 });
    } catch (error) {
      res.status(500).json({ error, status: 500 });
    }
  };
  
  // Get a post by ID
  const getPostByIdController = async (req, res) => {
    const postId = req.params.id;
    try {
      const postById = await getPostById(postId);
      res.json({ data: postById, status: 200 });
    } catch (error) {
      res.status(500).json({ error, status: 500 });
    }
  };
  
  // Create a new post
  const createPostController = async (req, res) => {
    try {
      const newPostInfo = req.body;
  
      if (!newPostInfo.title || !newPostInfo.body) {
        return res
          .status(400)
          .json({ error: "Title and body are required", status: 400 });
      }
  
      const newPost = await createPost(newPostInfo);
      res.status(201).json({ data: newPost, status: 201 });
    } catch (error) {
      res.status(500).json({ error, status: 500 });
    }
  };
  
  // Update a post by ID
  const updatePostController = async (req, res) => {
    const postId = req.params.id;
    const newPostInfo = req.body;
  
    try {
      const updatedPost = await updatePost(postId, newPostInfo);
  
      if (!updatedPost) {
        return res.status(404).json({ error: "Post not found", status: 404 });
      }
  
      res.json({ data: updatedPost, status: 200 });
    } catch (error) {
      res.status(500).json({ error, status: 500 });
    }
  };
  
  // Delete a post by ID
  const deletePostController = async (req, res) => {
    const postId = req.params.id;
  
    try {
      const deletedPost = await deletePost(postId);
  
      if (!deletedPost) {
        return res.status(404).json({ error: "Post not found", status: 404 });
      }
  
      res.json({
        message: "Post deleted successfully",
        data: deletedPost,
        status: 200,
      });
    } catch (error) {
      res.status(500).json({ error, status: 500 });
    }
  };
  
  // Get posts by tags
  const getPostsByTagController = async (req, res) => {
    const tag = req.params.tag;
  
    try {
      const postsWithTag = await getPostsByTag(tag);
      res.json({ data: postsWithTag, status: 200 });
    } catch (error) {
      res.status(500).json({ error, status: 500 });
    }
  };
  
  module.exports = {
    getAllPostsController,
    getPostByIdController,
    createPostController,
    updatePostController,
    deletePostController,
    getPostsByTagController,
  };
  
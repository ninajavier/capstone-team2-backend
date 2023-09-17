const express = require('express');
const pool = require('../db/pool'); // Adjust the path to your pool configuration file
const apiRouter = express.Router();

// Users Routes
apiRouter.get('/users', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM users');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  apiRouter.get('/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  apiRouter.post('/users', async (req, res) => {
    try {
      const { name, email } = req.body; // Replace with your actual column names
      const result = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  apiRouter.put('/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email } = req.body; // Replace with your actual column names
      const result = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id]);
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  apiRouter.delete('/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query('DELETE FROM users WHERE id = $1', [id]);
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

// Threads Routes
apiRouter.get('/threads', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM threads');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  apiRouter.get('/threads/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query('SELECT * FROM threads WHERE id = $1', [id]);
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  apiRouter.post('/threads', async (req, res) => {
    try {
      const { title, content, user_id } = req.body; // Adjust based on your column names
      const result = await pool.query('INSERT INTO threads (title, content, user_id) VALUES ($1, $2, $3) RETURNING *', [title, content, user_id]);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  apiRouter.put('/threads/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, user_id } = req.body; // Adjust based on your column names
      const result = await pool.query('UPDATE threads SET title = $1, content = $2, user_id = $3 WHERE id = $4 RETURNING *', [title, content, user_id, id]);
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  apiRouter.delete('/threads/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query('DELETE FROM threads WHERE id = $1', [id]);
      res.json({ message: 'Thread deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

// Comments Routes
apiRouter.get('/comments', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM comments');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  apiRouter.get('/comments/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query('SELECT * FROM comments WHERE id = $1', [id]);
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  apiRouter.post('/comments', async (req, res) => {
    try {
      const { thread_id, user_id, content } = req.body; // Adjust based on your column names
      const result = await pool.query('INSERT INTO comments (thread_id, user_id, content) VALUES ($1, $2, $3) RETURNING *', [thread_id, user_id, content]);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  apiRouter.put('/comments/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { thread_id, user_id, content } = req.body; // Adjust based on your column names
      const result = await pool.query('UPDATE comments SET thread_id = $1, user_id = $2, content = $3 WHERE id = $4 RETURNING *', [thread_id, user_id, content, id]);
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  apiRouter.delete('/comments/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query('DELETE FROM comments WHERE id = $1', [id]);
      res.json({ message: 'Comment deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

// Likes Routes
apiRouter.get('/likes', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM likes');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  apiRouter.get('/likes/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query('SELECT * FROM likes WHERE id = $1', [id]);
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  apiRouter.post('/likes', async (req, res) => {
    try {
      const { thread_id, user_id, comment_id } = req.body; // Adjust based on your column names
      const result = await pool.query('INSERT INTO likes (thread_id, user_id, comment_id) VALUES ($1, $2, $3) RETURNING *', [thread_id, user_id, comment_id]);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  apiRouter.delete('/likes/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query('DELETE FROM likes WHERE id = $1', [id]);
      res.json({ message: 'Like deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

module.exports = apiRouter;

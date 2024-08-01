const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPost,
  deletePost,
  editPost,
  addPost,
} = require('../controllers/apiPostControllers');

// Get all posts
router.get('/api/posts', getPosts);
// Get post by ID
router.get('/api/post/:id', getPost);
// Delete post by ID
router.delete('/api/post/:id', deletePost);
// Update post by ID
router.put('/api/post/:id', editPost);
// Add new post
router.post('/api/post', addPost);

module.exports = router;

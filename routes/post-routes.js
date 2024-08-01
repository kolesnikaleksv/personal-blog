const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPost,
  deletePost,
  getEditPost,
  editPost,
  getAddPost,
  addPost,
} = require('../controllers/postControllers');

router.get('/posts', getPosts);
router.get('/posts/:id', getPost);
router.delete('/posts/:id', deletePost);
router.get('/edit/:id', getEditPost);
router.put('/edit/:id', editPost);
router.get('/add-post', getAddPost);
router.post('/add-post', addPost);

module.exports = router;

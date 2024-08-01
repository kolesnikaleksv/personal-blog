const Post = require('../models/post');
const createPath = require('../helpers/createPath');

const hanleError = (error, res) => {
  console.log(error);
  res.render(createPath('error'), { title: 'Error' });
};

const getPosts = (req, res) => {
  const title = 'posts';
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => {
      res.render(createPath('posts'), { title, posts });
    })
    .catch((error) => hanleError(error, res));
};

const getPost = (req, res) => {
  const title = 'post';
  Post.findById(req.params.id)
    .then((post) => {
      res.render(createPath('post'), { post, title });
    })
    .catch((error) => hanleError(error, res));
};

const deletePost = (req, res) => {
  const title = 'post';
  Post.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => hanleError(error, res));
};

const getEditPost = (req, res) => {
  const title = 'Edit post';
  Post.findById(req.params.id)
    .then((post) => {
      res.render(createPath('edit-post'), { post, title });
    })
    .catch((error) => hanleError(error, res));
};

const editPost = (req, res) => {
  const { author, title, text } = req.body;
  const { id } = req.params;

  Post.findByIdAndUpdate(id, { author, title, text })
    .then((result) => res.redirect(`/posts/${id}`))
    .catch((error) => hanleError(error, res));
};

const getAddPost = (req, res) => {
  const title = 'add post';
  res.render(createPath('add-post'), { title });
};

const addPost = (req, res) => {
  const { author, title, text } = req.body;
  const post = new Post({ author, title, text });
  post
    .save()
    .then((result) => res.redirect('/posts'))
    .catch((error) => hanleError(error, res));
};

module.exports = {
  getPosts,
  getPost,
  deletePost,
  getEditPost,
  editPost,
  getAddPost,
  addPost,
};

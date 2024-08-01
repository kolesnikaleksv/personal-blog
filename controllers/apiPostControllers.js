const Post = require('../models/post');

const hanleError = (error, res) => {
  res.status(500).send(error.message);
};

const getPosts = (req, res) => {
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => hanleError(error, res));
};

const getPost = (req, res) => {
  console.log('elle');
  Post.findById(req.params.id)
    .then((post) => res.status(200).json(post))
    .catch((error) => hanleError(error, res));
};

const deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json(res.params.id))
    .catch((error) => hanleError(error, res));
};

const editPost = (req, res) => {
  const { author, title, text } = req.body;
  const { id } = req.params;

  Post.findByIdAndUpdate(id, { author, title, text }, { new: true })
    .then((post) => res.status(200).json(post))
    .catch((error) => hanleError(error, res));
};

const addPost = (req, res) => {
  const { author, title, text } = req.body;
  const post = new Post({ author, title, text });
  post
    .save()
    .then((post) => res.status(200).json(post))
    .catch((error) => hanleError(error, res));
};

module.exports = {
  getPosts,
  getPost,
  deletePost,
  editPost,
  addPost,
};

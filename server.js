const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Post = require('./models/post');
const Contact = require('./models/contacts');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('styles'));

const port = 5000;
const createPath = (page) =>
  path.resolve(__dirname, 'ejs-views', `${page}.ejs`);
const db =
  'mongodb+srv://kolesnikaleksv:1026b250977@nodeblog.ggbqowo.mongodb.net/';
// 'mongodb+srv://kolesnikaleksv:1026b250977@nodeblog.ggbqowo.mongodb.net/?retryWrites=true&w=majority&appName=nodeblog';

mongoose
  .connect(db)
  .then((res) => console.log('Connected to db'))
  .catch((err) => console.log(err));

app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  const title = 'Home';
  res.render(createPath('index'), { title });
});

app.get('/contacts', (req, res) => {
  const title = 'contacts';
  Contact.find()
    .then((contacts) => {
      console.log(contacts);
      res.render(createPath('contacts'), { contacts, title });
    })
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' });
    });
});

app.get('/about-us', (req, res) => {
  res.redirect('/contacts');
});

app.get('/posts', (req, res) => {
  const title = 'posts';
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => {
      res.render(createPath('posts'), { title, posts });
    })
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' });
    });
});

app.get('/posts/:id', (req, res) => {
  const title = 'post';
  Post.findById(req.params.id)
    .then((post) => {
      res.render(createPath('post'), { post, title });
    })
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title: 'Eroro' });
    });
});

app.get('/add-post', (req, res) => {
  const title = 'add post';
  res.render(createPath('add-post'), { title });
});

app.post('/add-post', (req, res) => {
  const { author, title, text } = req.body;
  const post = new Post({ author, title, text });
  post
    .save()
    .then((result) => res.redirect('/posts'))
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title: 'error' });
    });
});

app.use((req, res) => {
  const title = 'error';
  res.status(404).render(createPath('error'), { title });
});

app.listen(port, () => {
  console.log(`Server was launched on port: ${port}`);
});

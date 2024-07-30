const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Post = require('./models/post');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('styles'));

const port = 5000;
const createPath = (page) =>
  path.resolve(__dirname, 'ejs-views', `${page}.ejs`);
const db =
  'mongodb+srv://1026b250977:1026b250977@mfirstcluster.z25fpqb.mongodb.net/';

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
  const contacts = [
    { name: 'Portfolio', link: 'https://webwizardok.com/' },
    { name: 'Telegrams', link: 'https://t.me/KolisnykOleksandr' },
    { name: 'GitHub', link: 'https://github.com/kolesnikaleksv' },
  ];
  res.render(createPath('contacts'), { contacts, title });
});

app.get('/about-us', (req, res) => {
  res.redirect('/contacts');
});

app.get('/posts', (req, res) => {
  const title = 'posts';
  const posts = [
    {
      id: 1,
      text: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
      title: 'Post title',
      data: '07.07.2024',
      author: 'Oleksandr',
    },
    {
      id: 2,
      text: 'It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
      title: 'Second post title',
      data: '08.08.2024',
      author: 'Oleksandr',
    },
  ];
  res.render(createPath('posts'), { title, posts });
});

app.get('/posts/:id', (req, res) => {
  const title = 'post';
  const post = {
    id: 1,
    text: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
    title: 'Post title',
    data: '07.07.2024',
    author: 'Oleksandr',
  };
  res.render(createPath('post'), { post, title });
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
    .then((result) => res.send(result))
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

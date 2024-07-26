const express = require('express');
const path = require('path');
const http = require('http');
const fs = require('fs');

const app = express();

app.set('view engine', 'ejs');

const port = 5000;
const createPath = (page) =>
  path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

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
  res.render(createPath('posts'), { title });
});

app.get('/posts/:id', (req, res) => {
  const title = 'post';
  res.render(createPath('post'), { title });
});

app.get('/add-post', (req, res) => {
  const title = 'add post';
  res.render(createPath('add-post'), { title });
});

app.use((req, res) => {
  const title = 'error';
  res.status(404).render(createPath('error'), { title });
});

app.listen(port, () => {
  console.log(`Server was launched on port: ${port}`);
});

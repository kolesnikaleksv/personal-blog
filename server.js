const express = require('express');
const path = require('path');
const http = require('http');
const fs = require('fs');

const app = express();
const port = 5000;
const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`);

app.get('/', (req, res) => {
  res.sendFile(createPath('index'));
});

app.get('/contacts', (req, res) => {
  res.sendFile(createPath('contacts'));
});

app.get('/about-us', (req, res) => {
  res.redirect('/contacts');
});

app.get('/posts', (req, res) => {
  res.sendFile(createPath('posts'));
});

app.get('/posts/:id', (req, res) => {
  res.sendFile(createPath('post'));
});

app.get('/add-post', (req, res) => {
  res.sendFile(createPath('add-post'));
});

app.use((req, res) => {
  res.status(404).sendFile(createPath('error'));
});

app.listen(port, () => {
  console.log(`Server was launched on port: ${port}`);
});

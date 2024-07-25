const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 5000;
const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`);

const server = http.createServer((req, res) => {
  let basePath = '';

  switch (req.url) {
    case '/':
    case '/home':
    case '/index.js':
      basePath = createPath('index');
      break;
    case '/contacts':
      basePath = createPath('contacts');
      break;
    case '/about-us':
      res.statusCode = 301;
      res.setHeader('Location', '/contacts');
      res.end();
      break;
    default:
      basePath = createPath('error');
      res.statusCode = 404;
      break;
  }

  fs.readFile(basePath, (err, data) => {
    if (err) {
      res.statusCode = 500;
      console.log(err);
      res.end();
    } else {
      res.setHeader('Content-Type', 'text/html');
      res.write(data);
      res.end();
    }
  });
});

server.listen(port, (err) => {
  err ? console.log(err) : console.log(`Server was launched on port: ${port}`);
});

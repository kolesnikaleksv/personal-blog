const http = require('http');

const port = 5000;
const host = '127.0.0.1';
const server = http.createServer((req, res) => {
  console.log('hello from server');
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.write('Hello from backend! Frontenders are losers!');
  res.end();
});

server.listen(port, (err) => {
  err ? console.log(err) : console.log(`Server was launched on port: ${port}`);
});

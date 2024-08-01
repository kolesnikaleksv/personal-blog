const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const postRouters = require('./routes/post-routes');
const contactRouters = require('./routes/contact-routes');
const createPath = require('./helpers/createPath');
const apiPostRouters = require('./routes/apiPostRouters');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('styles'));
app.use(methodOverride('_method'));

const port = 5000;

const db =
  'mongodb+srv://kolesnikaleksv:1026b250977@nodeblog.ggbqowo.mongodb.net/';
// 'mongodb+srv://kolesnikaleksv:1026b250977@nodeblog.ggbqowo.mongodb.net/?retryWrites=true&w=majority&appName=nodeblog';

mongoose
  .connect(db)
  .then((res) => console.log('Connected to db'))
  .catch((err) => console.log(err));

app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false }));

app.use(postRouters);
app.use(contactRouters);
app.use(apiPostRouters);

app.get('/', (req, res) => {
  const title = 'Home';
  res.render(createPath('index'), { title });
});

app.get('/about-us', (req, res) => {
  res.redirect('/contacts');
});

app.use((req, res) => {
  const title = 'error';
  res.status(404).render(createPath('error'), { title });
});

app.listen(port, () => {
  console.log(`Server was launched on port: ${port}`);
});

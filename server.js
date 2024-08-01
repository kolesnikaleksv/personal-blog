const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const chalk = require('chalk');
const methodOverride = require('method-override');
const postRouters = require('./routes/post-routes');
const contactRouters = require('./routes/contact-routes');
const createPath = require('./helpers/createPath');
const apiPostRouters = require('./routes/apiPostRouters');

const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').white;

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('styles'));
app.use(methodOverride('_method'));

mongoose
  .connect(process.env.MONGO_URI)
  .then((res) => console.log(successMsg('Connected to db')))
  .catch((err) => console.log(errorMsg(err)));

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

app.listen(process.env.PORT, () => {
  console.log(successMsg(`Server was launched on port: ${process.env.PORT}`));
});

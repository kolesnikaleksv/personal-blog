const Contact = require('../models/contacts');
const createPath = require('../helpers/createPath');

const getContacts = (req, res) => {
  const title = 'contacts';
  Contact.find()
    .then((contacts) => {
      res.render(createPath('contacts'), { contacts, title });
    })
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' });
    });
};

module.exports = { getContacts };

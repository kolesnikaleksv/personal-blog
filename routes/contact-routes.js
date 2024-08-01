const express = require('express');
const router = express.Router();
const { getContacts } = require('../controllers/conactControllers');

router.get('/contacts', getContacts);

module.exports = router;

const express = require('express');
const controller = require('../controllers/users.controller');

const router = express.Router();

router.get('/users', controller.listUsers);
router.get('/users/:id', controller.getUserDetails);
router.post('/add', controller.addUser);

module.exports = router;

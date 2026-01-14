// Import Express and user controller
const express = require('express');
const controller = require('../controllers/users.controller');

// Routes for user management
const router = express.Router();

router.get('/users', controller.listUsers);
router.get('/users/:id', controller.getUserDetails);
router.post('/add', controller.addUser);

// Export user router
module.exports = router;

// Import Express and user controller
const express = require('express');
const controller = require('../controllers/users.controller');

// Routes for user management
const router = express.Router();

router.get('/users', controller.listUsers); // Route to list all users
router.get('/users/:id', controller.getUserDetails); // Route to get user details by ID
router.post('/add', controller.addUser); // Route to add a new user

// Export user router
module.exports = router;

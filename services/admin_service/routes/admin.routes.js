// Import Express and admin controller
const express = require('express');
const controller = require('../controllers/admin.controller');

const router = express.Router();

// Admin routes for developer info
router.get('/about', controller.getAbout);

// Export admin router
module.exports = router;

// Import Express and costs controller
const express = require('express');
const controller = require('../controllers/costs.controller');

const router = express.Router();

// Route for adding cost items
router.post('/add', controller.addCost);

// Export costs router
module.exports = router;

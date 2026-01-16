// Import Express and logs controller
const express = require('express');
const controller = require('../controllers/logs.controller');

const router = express.Router();

// Route for system logs history
router.get('/logs', controller.listLogs);

// Export logging router
module.exports = router;

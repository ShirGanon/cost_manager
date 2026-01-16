// Import Express and reports controller
const express = require('express');
const controller = require('../controllers/reports.controller');

const router = express.Router();

// Route for monthly cost reports
// GET /api/report?id=...&year=...&month=...
router.get('/report', controller.getMonthlyReport);

// Export report router
module.exports = router;

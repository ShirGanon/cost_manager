const express = require('express');
const controller = require('../controllers/reports.controller');

const router = express.Router();

// GET /api/report?id=...&year=...&month=...
router.get('/report', controller.getMonthlyReport);

module.exports = router;

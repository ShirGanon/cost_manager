// Import Express and ingestion controller
const express = require('express');
const controller = require('../controllers/ingest.controller');

const router = express.Router();

// Route for log ingestion
router.post('/log', controller.ingestLog);

// Export ingestion router
module.exports = router;

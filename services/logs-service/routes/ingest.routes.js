const express = require('express');
const controller = require('../controllers/ingest.controller');

const router = express.Router();

router.post('/log', controller.ingestLog);

module.exports = router;

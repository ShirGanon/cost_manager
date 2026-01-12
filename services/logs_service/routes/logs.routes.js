const express = require('express');
const controller = require('../controllers/logs.controller');

const router = express.Router();

router.get('/logs', controller.listLogs);

module.exports = router;

const express = require('express');
const controller = require('../controllers/costs.controller');

const router = express.Router();

// POST /api/add  (cost item)
router.post('/add', controller.addCost);

module.exports = router;

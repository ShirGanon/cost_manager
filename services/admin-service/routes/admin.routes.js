const express = require('express');
const controller = require('../controllers/admin.controller');

const router = express.Router();

router.get('/about', controller.getAbout);

module.exports = router;

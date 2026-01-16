// Import frameworks and middleware
const express = require('express');
const { toErrorJson } = require('../../utils/error');
const { requestLogger } = require('../../utils/request_logger');

const adminRoutes = require('./routes/admin.routes');

// Initialize app and JSON parsing
const app = express();
app.use(express.json());

// Global logging and admin routes
app.use(requestLogger('admin-service'));

app.use('/api', adminRoutes);

// Centralized error handler
app.use((err, req, res, next) => {
  const status = err.statusCode || 400;
  res.status(status).json(toErrorJson(err));
});

// Export app instance
module.exports = app;

// Express app setup with middleware and routes
const express = require('express');
const { toErrorJson } = require('../../utils/error');
const { requestLogger } = require('../../utils/request_logger');

const usersRoutes = require('./routes/users.routes');

const app = express();
app.use(express.json());
app.use(requestLogger('users-service'));

app.use('/api', usersRoutes);

// Centralized error handler
app.use((err, req, res, next) => {
  const status = err.statusCode || 400;
  res.status(status).json(toErrorJson(err));
});

// Export app instance
module.exports = app;


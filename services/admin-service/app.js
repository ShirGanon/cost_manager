const express = require('express');
const { toErrorJson } = require('../../utils/error');
const { requestLogger } = require('../../utils/request_logger');

const adminRoutes = require('./routes/admin.routes');

const app = express();
app.use(express.json());

// Log every request (best effort)
app.use(requestLogger('admin-service'));

app.use('/api', adminRoutes);

// error handler (must be last)
app.use((err, req, res, next) => {
  const status = err.statusCode || 400;
  res.status(status).json(toErrorJson(err));
});

module.exports = app;

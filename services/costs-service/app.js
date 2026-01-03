const express = require('express');
const { toErrorJson } = require('../../utils/error');
const { requestLogger } = require('../../utils/request-logger');

const costsRoutes = require('./routes/costs.routes');
const reportsRoutes = require('./routes/reports.routes');

const app = express();
app.use(express.json());

// Log every request (best effort)
app.use(requestLogger('costs-service'));

app.use('/api', costsRoutes);
app.use('/api', reportsRoutes);

// error handler
app.use((err, req, res, next) => {
  const status = err.statusCode || 400;
  res.status(status).json(toErrorJson(err));
});

module.exports = app;

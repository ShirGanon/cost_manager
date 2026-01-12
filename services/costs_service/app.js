const express = require('express');

const { toErrorJson } = require('../../utils/error');
const { requestLogger } = require('../../utils/request_logger');

const costsRoutes = require('./routes/costs.routes');
const reportsRoutes = require('./routes/reports.routes');

const app = express();
app.use(express.json());

// log every incoming request (as required)
app.use(requestLogger('costs-service'));

app.use('/api', costsRoutes);
app.use('/api', reportsRoutes);

// centralized error handler – MUST return JSON
app.use((err, req, res, next) => {
  const status = err.statusCode || 400;
  res.status(status).json(toErrorJson(err));
});

module.exports = app;

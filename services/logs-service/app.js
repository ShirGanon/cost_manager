const express = require('express');
const { toErrorJson } = require('../../utils/error');
// const { requestLogger } = require('../../utils/request-logger');

const logsRoutes = require('./routes/logs.routes');
const ingestRoutes = require('./routes/ingest.routes');

const app = express();
app.use(express.json());
// app.use(requestLogger('users-service'));

app.use('/api', logsRoutes);
app.use('/internal', ingestRoutes);

// error handler
app.use((err, req, res, next) => {
  const status = err.statusCode || 400;
  res.status(status).json(toErrorJson(err));
});

module.exports = app;

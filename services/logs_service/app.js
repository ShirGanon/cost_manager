// Import Express and error utilities
const express = require('express');
const { toErrorJson } = require('../../utils/error');

// Load logging and ingestion routes
const logsRoutes = require('./routes/logs.routes');
const ingestRoutes = require('./routes/ingest.routes');

// Initialize app and JSON parsing
const app = express();
app.use(express.json());

// Mount logging and ingestion routes
app.use('/api', logsRoutes);
app.use('/internal', ingestRoutes);

// error handler
app.use((err, req, res, next) => {
  const status = err.statusCode || 400;
  res.status(status).json(toErrorJson(err));
});

/// Export app instance
module.exports = app;

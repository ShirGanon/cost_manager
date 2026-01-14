// Factory for custom business errors
function createAppError(id, message, statusCode) {
  const err = new Error(message);
  err.id = id;
  err.statusCode = statusCode || 400;
  // Return enriched error for middleware
  return err;
}

// Standardize error as JSON response
function toErrorJson(err) {
  return {
    // Fallback to generic error defaults
    id: err && err.id ? err.id : 1,
    message: err && err.message ? err.message : 'Unknown error'
  };
}

// Export error handling utilities
module.exports = {
  createAppError,
  toErrorJson
};

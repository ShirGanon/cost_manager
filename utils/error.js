// Import shared error codes
const { ERROR_CODES } = require('./error_codes');

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
  // Handle MongoDB errors centrally
  if (err && (err.name === 'MongoError' || err.name === 'MongoServerError' || err.name === 'ValidationError' || err.name === 'CastError')) {
    return {
      id: ERROR_CODES.DB_ERROR,
      message: err.message || 'Database error'
    };
  }
  
  return {
    // Fallback to generic error defaults
    id: err && err.id ? err.id : ERROR_CODES.UNKNOWN_ERROR,
    message: err && err.message ? err.message : 'Unknown error'
  };
}

// Export error handling utilities
module.exports = {
  createAppError,
  toErrorJson
};

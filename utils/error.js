const { ERROR_CODES } = require('./error_codes');

function createAppError(id, message, statusCode) {
  const err = new Error(message);
  err.id = id;
  err.statusCode = statusCode || 400;
  return err;
}

function toErrorJson(err) {
  // Handle MongoDB errors centrally
  if (err && (err.name === 'MongoError' || err.name === 'MongoServerError' || err.name === 'ValidationError' || err.name === 'CastError')) {
    return {
      id: ERROR_CODES.DB_ERROR,
      message: err.message || 'Database error'
    };
  }
  
  return {
    id: err && err.id ? err.id : ERROR_CODES.UNKNOWN_ERROR,
    message: err && err.message ? err.message : 'Unknown error'
  };
}

module.exports = {
  createAppError,
  toErrorJson
};

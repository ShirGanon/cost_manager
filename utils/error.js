function createAppError(id, message, statusCode) {
  const err = new Error(message);
  err.id = id;
  err.statusCode = statusCode || 400;
  return err;
}

function toErrorJson(err) {
  return {
    id: err && err.id ? err.id : 1,
    message: err && err.message ? err.message : 'Unknown error'
  };
}

module.exports = {
  createAppError,
  toErrorJson
};

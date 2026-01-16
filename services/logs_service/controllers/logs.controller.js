// Import Log model
const Log = require('../../../models/log.model');

// Fetch logs sorted by latest
async function listLogs(req, res, next) {
  try {
    // Fetch lean logs excluding _id
    const logs = await Log.find({}, { _id: 0 }).sort({ timestamp: -1 }).lean();
    res.json(logs);
  } catch (err) {
    next(err);
  }
}

// Export log listing function
module.exports = {
  listLogs
};

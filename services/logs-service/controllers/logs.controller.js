const Log = require('../../../models/log.model');

async function listLogs(req, res, next) {
  try {
    const logs = await Log.find({}, { _id: 0 }).sort({ timestamp: -1 }).lean();
    res.json(logs);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listLogs
};

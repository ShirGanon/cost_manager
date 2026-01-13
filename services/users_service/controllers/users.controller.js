const User = require('../../../models/user.model');
const Cost = require('../../../models/cost.model');
const { createAppError } = require('../../../utils/error');
const { ERROR_CODES } = require('../../../utils/error_codes');
const { parseNumber } = require('../../../utils/validate');

async function listUsers(req, res, next) {
  try {
    const users = await User.find({}, { _id: 0 }).lean();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

async function getUserDetails(req, res, next) {
  try {
    const id = parseNumber(req.params.id);
    if (id === null) {
      throw createAppError(ERROR_CODES.INVALID_ID, 'Invalid id', 400);
    }

    const user = await User.findOne({ id }, { _id: 0 }).lean();
    if (!user) {
      throw createAppError(ERROR_CODES.USER_NOT_FOUND, 'User not found', 404);
    }

    const agg = await Cost.aggregate([
      { $match: { userid: id } },
      { $group: { _id: null, total: { $sum: '$sum' } } }
    ]);

    const total = agg.length ? agg[0].total : 0;

    res.json({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      total
    });
  } catch (err) {
    next(err);
  }
}

async function addUser(req, res, next) {
  try {
    // TODO: add validation (id, first_name, last_name, birthday)
    const { id, first_name, last_name, birthday } = req.body;

    if (typeof first_name !== 'string' || typeof last_name !== 'string') {
      throw createAppError(ERROR_CODES.INVALID_FIRST_NAME_LAST_NAME, 'Invalid first_name/last_name', 400);
    }

    const userId = parseNumber(id);
    if (userId === null) {
      throw createAppError(ERROR_CODES.INVALID_ID, 'Invalid id', 400);
    }

    const bday = new Date(birthday);
    if (Number.isNaN(bday.getTime())) {
      throw createAppError(ERROR_CODES.INVALID_BIRTHDAY, 'Invalid birthday', 400);
    }

    const created = await User.create({
      id: userId,
      first_name,
      last_name,
      birthday: bday
    });

    res.json({
      id: created.id,
      first_name: created.first_name,
      last_name: created.last_name,
      birthday: created.birthday
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listUsers,
  getUserDetails,
  addUser
};

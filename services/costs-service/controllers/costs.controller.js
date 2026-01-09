const Cost = require('../../../models/cost.model');
const User = require('../../../models/user.model');

const { CATEGORIES } = require('../../../utils/constants');
const { createAppError } = require('../../../utils/error');
const {
  isNonEmptyString,
  parseNumber,
  validateCategory,
  parseDate,
  isNotPastDate
} = require('../../../utils/validate');

async function addCost(req, res, next) {
  try {
    const { description, category, userid, sum, date } = req.body;

    if (!isNonEmptyString(description)) {
      throw createAppError(101, 'Invalid description', 400);
    }

    if (!validateCategory(category, CATEGORIES)) {
      throw createAppError(102, 'Invalid category', 400);
    }

    const userId = parseNumber(userid);
    if (userId === null || !Number.isInteger(userId)) {
      throw createAppError(103, 'Invalid userid', 400);
    }

    const costSum = parseNumber(sum);
    if (costSum === null) {
      throw createAppError(104, 'Invalid sum', 400);
    }

    // Business date: default today (allowed), allow future, forbid past
    let costDate = new Date();
    if (date !== undefined) {
      const parsed = parseDate(date);
      if (!parsed) {
        throw createAppError(105, 'Invalid date', 400);
      }
      costDate = parsed;
    }

    if (!isNotPastDate(costDate)) {
      throw createAppError(106, 'Costs with past dates are not allowed', 400);
    }

    // Verify user exists
    const user = await User.findOne({ id: userId }, { _id: 0, id: 1 }).lean();
    if (!user) {
      throw createAppError(107, 'User not found', 404);
    }

    const doc = await Cost.create({
      description: description.trim(),
      category,
      userid: userId,
      sum: costSum,
      date: costDate,
      createdAt: new Date()
    });

    // Return the added cost item with the same property names as in the costs collection
    res.json({
      description: doc.description,
      category: doc.category,
      userid: doc.userid,
      sum: doc.sum,
      date: doc.date
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  addCost
};

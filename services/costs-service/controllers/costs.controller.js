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

/**
 * POST /api/add (cost)
 * Required fields: description, category, userid, sum
 * Optional: createdAt (if not provided -> request time)
 *
 * Notes:
 * - Must validate input.
 * - Must verify user exists.
 * - Must not allow costs with dates in the past.
 */
async function addCost(req, res, next) {
  try {
    const { description, category, userid, sum, createdAt } = req.body;

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

    // Determine createdAt
    let created = new Date();
    if (createdAt !== undefined) {
      const d = parseDate(createdAt);
      if (!d) {
        throw createAppError(105, 'Invalid createdAt', 400);
      }
      created = d;
    }

    // Must not allow past dates
    if (!isNotPastDate(created)) {
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
      createdAt: created
    });

    // Response should describe the new cost item that was added
    res.json({
      description: doc.description,
      category: doc.category,
      userid: doc.userid,
      sum: doc.sum,
      createdAt: doc.createdAt
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  addCost
};

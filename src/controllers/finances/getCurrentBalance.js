const createError = require("http-errors");
const { Balance } = require("../../schemas/balance");
const { constants } = require("../../utils");

const { ERROR_MESSAGES } = constants;

const getCurrentBalance = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Balance.findOne({ owner }).select({
    entryFee: 1,
    totalCost: 1,
    totalIncome: 1,
  });

  if (!result) throw createError(404, ERROR_MESSAGES.notFound);

  const { entryFee, totalIncome, totalCost } = result;
  const balance = entryFee + totalIncome - totalCost;

  res.status(200).json({
    status: "success",
    code: 200,
    result: balance,
  });
};

module.exports = getCurrentBalance;

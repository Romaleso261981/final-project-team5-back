const { Finance } = require("../../schemas/finance");
const { getDaysInterval, constants } = require("../../utils");

const { TRANSACTION_TYPES } = constants;

const getFinance = async (req, res) => {
  const { _id: owner } = req.user;
  const { type, period } = req.query;

  const [minPeriod, maxPeriod] = getDaysInterval(period);

  const types =
    type === TRANSACTION_TYPES.ALL
      ? [TRANSACTION_TYPES.DEBIT, TRANSACTION_TYPES.CREDIT]
      : [type];

  const result = await Finance.find({
    owner,
    type: { $in: types },
    completedAt: { $gte: minPeriod, $lt: maxPeriod },
  }).select({ owner: 0, createdAt: 0, updatedAt: 0 });

  res.status(200).json({
    status: "success",
    code: 200,
    result,
  });
};

module.exports = getFinance;

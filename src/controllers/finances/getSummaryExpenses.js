const { Finance } = require("../../schemas/finance");
const { Types } = require("mongoose");

async function getSummaryExpenses(req, res) {
  const owner = req.user.id;
  const { type = "expenses", month = 0, year = 0 } = req.query;
  const searchParam = {
    owner: Types.ObjectId(owner),
    type,
    month: parseInt(month),
    year: parseInt(year),
  };
  try {
    const result = await Finance.aggregate([
      { $match: searchParam },
      { $project: { amount: 1, owner: 1 } },
      { $group: { _id: "amount", totalAmount: { $sum: "$amount" } } },
    ]);

    if (result.length === 1) {
      const { totalAmount } = result[0];
      return res.status(200).json({ ...searchParam, totalAmount });
    }

    return res
      .status(200)
      .json({ totalAmount: 0, ...searchParam, message: "no result" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = getSummaryExpenses;

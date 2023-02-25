const { Finance } = require("../../schemas/finance");
const { Types } = require("mongoose");

async function getSummary(req, res) {
  const owner = req.user.id;
  // type: expenses or income
  const { type = "expenses", month = 0, year = 0, countmonth = 0 } = req.query;
  const count = parseInt(countmonth);
  const searchParam = {
    owner: Types.ObjectId(owner),
    type,
    month: parseInt(month),
    year: parseInt(year),
  };
  // console.log("getSummary searchParam", searchParam);
  try {
    if (count == 0) {
      const result = await Finance.aggregate([
        { $match: searchParam },
        { $project: { amount: 1, owner: 1 } },
        {
          $group: {
            _id: { year, month },
            totalAmount: { $sum: "$amount" },
          },
        },
      ]);
      // console.log("getSummary result", result.length, result);
      if (result.length === 1) {
        return res.status(200).json(result);
      }
    } else if (count > 0 && count < 13) {
      const result = await Finance.aggregate([
        {
          $match: {
            owner: Types.ObjectId(owner),
            type,
          },
        },
        { $project: { amount: 1, month: 1, year: 1 } },
        {
          $group: {
            _id: { year: "$year", month: "$month" },
            totalAmount: { $sum: "$amount" },
          },
        },
        { $sort: { _id: -1 } },
        { $limit: count },
      ]);
      // console.log("goodSummary result", result.length, result);
      return res.status(200).json(result);
    }

    return res.status(200).json([
      {
        totalAmount: 0,
        ...searchParam,
        countmonth: count,
        message: "no result",
      },
    ]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = getSummary;

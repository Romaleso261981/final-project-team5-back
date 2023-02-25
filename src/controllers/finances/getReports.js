const { Finance } = require("../../schemas/finance");
const { Types } = require("mongoose");

async function getReports(req, res) {
  const owner = req.user.id;
  // form = 1 responce("all transactions in one massive")
  // form = 2 responce("all transactions in one massive")
  // type: "0" or "expenses" or "income"
  const {
    total = 1,
    type = "0",
    category = "",
    month = 0,
    year = 0,
  } = req.query;
  const searchParam = {
    owner: Types.ObjectId(owner),
    month: parseInt(month),
    year: parseInt(year),
  };
  console.log("req.query", req.query);
  console.log("getReports searchParam", searchParam);

  try {
    if (total == 1 && type === "0") {
      const result = await Finance.find(searchParam).select({
        owner: 0,
        __v: 0,
      });
      return res.status(200).json(result);
    } else if (total == 2 && type === "0") {
      const result = await Finance.aggregate([
        { $match: searchParam },
        { $project: { amount: 1, type: 1 } },
        {
          $group: {
            _id: { type: "$type" },
            totalAmount: { $sum: "$amount" },
          },
        },
        { $sort: { _id: 1 } },
      ]);
      return res.status(200).json(result);
    } else if (
      total == 1 &&
      (type === "expenses" || type === "income") &&
      category === ""
    ) {
      const result = await Finance.aggregate([
        { $match: { ...searchParam, type } },
        { $project: { amount: 1, category: 1 } },
        {
          $group: {
            _id: { category: "$category" },
            totalAmount: { $sum: "$amount" },
          },
        },
        { $sort: { totalAmount: -1 } },
      ]);
      return res.status(200).json(result);
    } else if (
      total == 1 &&
      (type === "expenses" || type === "income") &&
      category !== ""
    ) {
      const result = await Finance.aggregate([
        { $match: { ...searchParam, type, category } },
        { $project: { amount: 1, category: 1, description: 1 } },
        { $sort: { amount: -1 } },
      ]);
      return res.status(200).json(result);
    }

    return res.status(200).json({ message: "Reports return empty" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = getReports;

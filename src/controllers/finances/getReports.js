const { Finance } = require("../../schemas/finance");
const { Types } = require("mongoose");

async function getReports(req, res) {
  const owner = req.user.id;
  // form = 1 responce("all transactions in one massive")
  // form = 2 responce("all transactions in one massive")
  const { form = 1, month = 0, year = 0 } = req.query;
  const searchParam = {
    owner: Types.ObjectId(owner),
    // type,
    month: parseInt(month),
    year: parseInt(year),
  };
  console.log("getReports searchParam", searchParam);

  try {
    if (form == 1) {
      const result = await Finance.find(searchParam);
      return res.status(200).json(result);
    } else if (form == 2) {
      const result = await Finance.aggregate([
        { $match: searchParam },
        // { $project: { type: 1 } },
        { $sort: { month: 1 } },
      ]);

      return res.status(200).json(result);
    }

    // const result = await Finance.aggregate([
    //   { $match: searchParam },
    //   { $project: { amount: 1, owner: 1 } },
    //   { $group: { _id: "amount", amount: { $sum: "$amount" } } },
    // ]);
    // console.log("getSummary result", result.length, result);

    // if (result.length === 1) {
    //   const { amount } = result[0];
    //   return res.status(200).json({ ...searchParam, amount });
    // }

    return res.status(200).json({ message: "getReports ok, ну почти" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = getReports;

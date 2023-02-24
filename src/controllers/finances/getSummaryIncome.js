const { User } = require("../../schemas/user");

async function getSummaryIncome(req, res) {
  return res.status(501).json({ message: "getSummaryIncome" });
}

module.exports = getSummaryIncome;

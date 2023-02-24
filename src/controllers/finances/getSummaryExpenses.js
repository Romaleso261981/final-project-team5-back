const { User } = require("../../schemas/user");

async function getSummaryExpenses(req, res) {
  return res.status(501).json({ message: "getSummaryExpenses" });
}

module.exports = getSummaryExpenses;

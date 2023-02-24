const { User } = require("../../schemas/user");

async function getSummary(req, res) {
  return res.status(501).json({ message: "getSummary" });
}

module.exports = getSummary;

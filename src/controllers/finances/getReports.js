const { User } = require("../../schemas/user");

async function getReports(req, res) {
  return res.status(501).json({ message: "getReports" });
}

module.exports = getReports;

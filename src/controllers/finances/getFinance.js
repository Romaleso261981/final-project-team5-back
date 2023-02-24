const { Finance } = require("../../schemas/finance");

const getFinance = async (req, res) => {
  const owner = req.user.id;
  const { type = "expenses", month = 0, year = 0 } = req.query;
  try {
    const searchParam = { owner, type, month, year };
    const result = await Finance.find(searchParam);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getFinance;

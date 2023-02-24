const { Finance } = require("../../schemas/finance");

async function addIncome(req, res) {
  const owner = req.user.id;
  const body = req.body;
  try {
    if (Object.keys(body).length === 0) {
      return res.status(400).json({ message: "missing fields" });
    }
    const type = "income";
    const result = await Finance.create({ ...body, type, owner });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = addIncome;

const { Finance } = require("../../schemas/finance");

const addTransaction = async (req, res) => {
  const owner = req.user.id;
  const body = req.body;
  try {
    if (Object.keys(body).length === 0) {
      return res.status(400).json({ message: "missing fields" });
    }

    const result = await Finance.create({ ...body, owner });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = addTransaction;

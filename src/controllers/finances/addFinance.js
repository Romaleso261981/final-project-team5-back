const { Finance } = require("../../schemas/finance");

const addFinance = async (req, res) => {
  const { _id: owner } = req.user;

  const newFinanceData = {
    type: req.body.type,
    completedAt: req.body.date,
    description: req.body.description,
    category: req.body.category,
    amount: req.body.amount,
  };

  const result = await Finance.create({ ...newFinanceData, owner });

  const { _id, type, completedAt, description, category, amount } = result;

  res.status(201).json({
    status: "success",
    code: 201,
    result: {
      _id,
      type,
      completedAt,
      description,
      category,
      amount,
    },
  });
};

module.exports = addFinance;

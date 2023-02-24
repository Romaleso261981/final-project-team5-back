const { User } = require("../../schemas/user");
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

const addTransaction = async (req, res) => {
  const owner = req.user.id;
  const body = req.body;
  try {
    if (Object.keys(body).length === 0) {
      return res.status(400).json({ message: "missing fields" });
    }

    const result = await Finance.create({ ...body, owner });

    // const validationResult = schemaBalance.validate(body);
    // if (validationResult.error) {
    //   return res.status(400).json({ message: "invalid value content" });
    // }

    // const storedUser = await User.findByIdAndUpdate(_id, body, {
    //   new: true,
    // }).select({
    //   balance: 1,
    //   _id: 0,
    // });
    // if (!storedUser) {
    //   return res.status(401).json({ message: "User not found" });
    // }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = addTransaction;

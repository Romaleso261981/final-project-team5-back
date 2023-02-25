const { User } = require("../../schemas/user");
const { validateBalanceShema } = require("../../schemas/validation");

async function setBalance(req, res) {
  const { _id } = req.user;
  const body = req.body;
  try {
    if (Object.keys(body).length === 0) {
      return res.status(400).json({ message: "missing fields" });
    }

    const validationResult = validateBalanceShema.validate(body);
    if (validationResult.error) {
      return res.status(400).json({ message: "invalid value content" });
    }

    const storedUser = await User.findByIdAndUpdate(_id, body, {
      new: true,
    }).select({
      balance: 1,
      _id: 0,
    });
    if (!storedUser) {
      return res.status(401).json({ message: "User not found" });
    }

    return res.status(200).json(storedUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = setBalance;

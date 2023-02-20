const createError = require("http-errors");
const { User } = require("../../schemas/user");
const { constants } = require("../../utils");

const { ERROR_MESSAGES } = constants;

const updateBalance = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
  if (!result) {
    throw createError(404, ERROR_MESSAGES.notFound);
  }
  res.json(result);
};

module.exports = updateBalance;

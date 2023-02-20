const { Types } = require("mongoose");
const createError = require("http-errors");
const { Finance } = require("../../schemas/finance");

const deleteFinance = async (req, res) => {
  const { _id: owner } = req.user;
  const _id = Types.ObjectId(req.params.financeId);

  const result = await Finance.findOneAndRemove({ _id, owner }).select({
    owner: 0,
    type: 0,
    createdAt: 0,
    updatedAt: 0,
  });

  if (!result) throw createError(404, "Not found");

  res.status(200).json({
    status: "success",
    code: 200,
    message: "transaction deleted",
  });
};

module.exports = deleteFinance;

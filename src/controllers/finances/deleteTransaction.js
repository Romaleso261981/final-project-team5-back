const { Finance } = require("../../schemas/finance");

async function deleteTransaction(req, res) {
  const owner = req.user.id;
  const id = req.params.transactionId;

  const searchParam = { _id: id, owner };
  const result = await Finance.findOneAndRemove(searchParam);

  if (result) {
    return res.status(200).json({ message: "Transaction deleted" });
  }

  return res.status(404).json({ message: "Not found" });
}

module.exports = deleteTransaction;

const { Schema, model } = require("mongoose");
const {
  constants: { TRANSACTION_TYPES },
  getBalance,
} = require("../utils");

const schemaFinances = new Schema({
  date: {
    type: { type: Date, default: Date.now },
  },
  description: {
    type: String,
  },
  completedAt: {
    type: Date,
    required: [true, "Unset transaction date"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product-category",
    required: [true, "Set category of product for finance"],
  },
  amount: {
    type: Number,
    required: [true, "Set amount for finance"],
  },
  currency: {
    type: String,
    enum: ["UAH", "USD", "EUR", "PLN", "RUB", "CZK", "GBP"],
    default: "UAH",
  },
  type: {
    type: String,
    enum: ["expenses", "income"],
    required: [true, "Set type of transaction for finance"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "Set record owner of transaction for finance"],
  },
});

// pre-hook for changing balance before adding transaction
schemaFinances.pre("save", { document: true }, async function (next) {
  const { owner, type, amount } = this;

  const doc = await model("balance").findOne({ owner });

  if (!doc) throw new Error("balance entry fee not set");

  const currentBalance = getBalance(doc);

  if (
    type.toLowerCase() === TRANSACTION_TYPES.CREDIT &&
    currentBalance < amount
  ) {
    throw new Error("insufficient balance");
  }

  type.toLowerCase() === TRANSACTION_TYPES.CREDIT
    ? (doc.totalCost += amount)
    : (doc.totalIncome += amount);

  doc.save();
  next();
});

// pre-hook for changing balance before removing transaction
schemaFinances.pre(
  "findOneAndRemove",
  { document: false, query: true },
  async function (next) {
    const financeId = this.getQuery()._id;

    const transaction = await model("finances").findOne({
      _id: financeId,
    });

    if (!transaction) next();

    const { owner, type, amount } = transaction;

    const doc = await model("balance").findOne({ owner });

    if (!doc) throw new Error("balance entry fee not set");

    const currentBalance = getBalance(doc);

    if (
      type.toLowerCase() === TRANSACTION_TYPES.DEBIT &&
      currentBalance < amount
    ) {
      throw new Error("Execution error. Negative balance expected");
    }

    type.toLowerCase() === TRANSACTION_TYPES.DEBIT
      ? (doc.totalIncome -= amount)
      : (doc.totalCost -= amount);

    doc.save();
    next();
  }
);

const Finance = mongoose.model("finances", schemaFinances);

module.exports = {
  Finance,
};

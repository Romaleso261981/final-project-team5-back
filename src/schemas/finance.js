const mongoose = require("mongoose");

const schemaFinances = mongoose.Schema({
  date: {
    type: { type: Date, default: Date.now },
  },
  description: {
    type: String,
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

const schemaCategories = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name of category for Categories"],
  },
});

const Finance = mongoose.model("finances", schemaFinances);
const Category = mongoose.model("categories", schemaCategories);

module.exports = {
  Finance,
  Category,
};

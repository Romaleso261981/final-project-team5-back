const { Schema, model } = require("mongoose");

const balanceSchema = new Schema(
  {
    entryFee: {
      type: Number,
      min: 0.01,
    },
    totalCost: {
      type: Number,
      default: 0,
    },
    totalIncome: {
      type: Number,
      default: 0,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Owner is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const Balance = model("balance", balanceSchema);

module.exports = Balance;

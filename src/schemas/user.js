const mongoose = require("mongoose");

const schema = mongoose.Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  token: {
    type: String,
    default: null,
  },
  balance: {
    type: Number,
    default: 0,
  },
  avatarURL: String,
});

const User = mongoose.model("users", schema);

module.exports = {
  User,
};

const mongoose = require("mongoose");

const schemaCategories = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name of category for Categories"],
  },
});

const Category = mongoose.model("categories", schemaCategories);

module.exports = {
  Category,
};

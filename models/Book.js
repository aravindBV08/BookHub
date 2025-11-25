const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    name: String,
    author: String,
    subtitle: String,
    description: String,
    mrp: Number,
    salePrice: Number,
    offerPrice: Number,
    images: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);

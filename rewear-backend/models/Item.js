const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  imageUrl: String,
  category: {
    type: String,
    enum: ["Men", "Women", "Kids", "Unisex"],
  },
  condition: {
    type: String,
    enum: ["New", "Like New", "Used"],
    default: "Used",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["available", "redeemed", "pendingSwap"],
    default: "available",
  },
  points: {
    type: Number,
    default: 10,
  },
  approved: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model("Item", itemSchema);

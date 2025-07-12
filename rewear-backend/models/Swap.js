const mongoose = require("mongoose");

const swapSchema = new mongoose.Schema({
  itemOffered: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  itemRequested: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  initiator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "completed"],
    default: "pending",
  },
}, { timestamps: true });

module.exports = mongoose.model("Swap", swapSchema);

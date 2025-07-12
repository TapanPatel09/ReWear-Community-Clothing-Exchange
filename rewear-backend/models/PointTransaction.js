// const mongoose = require("mongoose");

// const transactionSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   amount: Number,
//   type: { type: String, enum: ["earn", "spend"] },
//   description: String,
// }, { timestamps: true });

// module.exports = mongoose.model("PointTransaction", transactionSchema);

const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["earn", "spend"],
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PointTransaction", transactionSchema);

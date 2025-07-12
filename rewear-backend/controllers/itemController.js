const Item = require("../models/Item");
const PointTransaction = require("../models/PointTransaction");
const User = require("../models/User");
// const uploadImage = require("../utils/uploadImage"); // Optional for future use

const addItem = async (req, res, next) => {
  try {
    const { title, description, category, type, size, condition, tags, images } = req.body;
    const newItem = new Item({
      title, description, category, type, size, condition,
      tags, images, owner: req.user._id
    });
    await newItem.save();
    res.status(201).json({ message: "Item listed successfully", item: newItem });
  } catch (err) {
    next(err);
  }
};

const getItems = async (req, res, next) => {
  try {
    const items = await Item.find({ status: "available" }).populate("owner", "name");
    res.json(items);
  } catch (err) {
    next(err);
  }
};

const getItemById = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id).populate("owner", "name email");
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

const redeemItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item || item.status !== "available") {
      return res.status(400).json({ error: "Item not available" });
    }

    const user = await User.findById(req.user._id);
    const redeemCost = 10;

    if (user.points < redeemCost) {
      return res.status(400).json({ error: "Not enough points" });
    }

    user.points -= redeemCost;
    item.status = "redeemed";
    await user.save();
    await item.save();

    const transaction = new PointTransaction({
      user: user._id,
      amount: -redeemCost,
      type: "spend",
      description: `Redeemed item: ${item.title}`
    });
    await transaction.save();

    res.status(200).json({ message: "Item redeemed successfully", item });
  } catch (err) {
    next(err);
  }
};

module.exports = { addItem, getItems, getItemById, redeemItem };

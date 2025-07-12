const Item = require("../models/Item");

const moderateItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });

    item.status = req.body.status || "available"; // Or use a flag like "approved"/"rejected"
    await item.save();

    res.json({ message: "Item status updated", item });
  } catch (err) {
    next(err);
  }
};

const removeItem = async (req, res, next) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });

    res.json({ message: "Item removed by admin" });
  } catch (err) {
    next(err);
  }
};

module.exports = { moderateItem, removeItem };

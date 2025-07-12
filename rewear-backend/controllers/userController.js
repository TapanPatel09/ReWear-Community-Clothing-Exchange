const User = require("../models/User");
const Item = require("../models/Item");
const Swap = require("../models/Swap");

const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    const items = await Item.find({ owner: user._id });
    const swaps = await Swap.find({ requester: user._id }).populate("item");

    res.json({
      user,
      uploadedItems: items,
      swaps,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getUserProfile };

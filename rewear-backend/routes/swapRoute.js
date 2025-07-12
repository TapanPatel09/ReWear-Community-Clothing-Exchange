const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const Swap = require("../models/Swap.js");
const Item = require("../models/Item.js");

// Create a swap request
router.post("/", protect, async (req, res) => {
  try {
    const { itemOffered, itemRequested } = req.body;

    const offeredItem = await Item.findById(itemOffered);
    const requestedItem = await Item.findById(itemRequested);

    if (!offeredItem || !requestedItem) {
      return res.status(404).json({ message: "One or both items not found" });
    }

    const newSwap = new Swap({
      itemOffered,
      itemRequested, 
      initiator: req.user._id,
      recipient: requestedItem.owner,
    });

    await newSwap.save();

    offeredItem.status = "pendingSwap";
    await offeredItem.save();

    requestedItem.status = "pendingSwap";
    await requestedItem.save();

    res.status(201).json({ message: "Swap request created", swap: newSwap });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Swap creation failed" });
  }
});

module.exports = router;

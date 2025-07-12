const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  addItem, getItems, getItemById, redeemItem
} = require("../controllers/itemController");

router.post("/", protect, addItem);
router.get("/", getItems);
router.get("/:id", getItemById);
router.post("/:id/redeem", protect, redeemItem);

module.exports = router;

const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const adminCheck = require("../middleware/adminMiddleware");
const {
  moderateItem, removeItem
} = require("../controllers/adminController");

router.use(protect, adminCheck);
router.post("/moderate/:id", moderateItem);
router.delete("/remove/:id", removeItem);

module.exports = router;

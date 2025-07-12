const express = require("express");
const router = express.Router();

// Home page
router.get("/", (req, res) => {
  res.render("home", { layout: "layout", title: "Home | ReWear" });
});

// Login page
router.get("/login", (req, res) => {
  res.render("login", { layout: "layout", title: "Login | ReWear" });
});

// Register page
router.get("/register", (req, res) => {
  res.render("register", { layout: "layout", title: "Register | ReWear" });
});

module.exports = router;

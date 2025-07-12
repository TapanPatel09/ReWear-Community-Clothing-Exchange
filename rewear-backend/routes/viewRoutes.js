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

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}



module.exports = router;

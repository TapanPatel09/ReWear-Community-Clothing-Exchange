const express = require("express");
const passport = require("passport");
const router = express.Router();

// Redirect to Google login
router.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route after Google login
router.get("/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login"
  }),
  (req, res) => {
    // Success → redirect to dashboard or home
    res.redirect("/dashboard");
  }
);

// Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

module.exports = router;

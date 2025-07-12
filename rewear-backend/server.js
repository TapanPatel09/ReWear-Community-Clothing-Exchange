const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Backend API Routes
const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Frontend View Routes
const viewRoutes = require("./routes/viewRoutes");

// Custom Error Middleware
const errorHandler = require("./middleware/errorHandler");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const session = require("express-session");
const passport = require("passport");
require("./config/passport");

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Static Files (CSS, Images)
app.use(express.static(path.join(__dirname, "public")));

// EJS Template Engine Setup
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Connect to MongoDB
require("./config/db")();

const googleAuthRoutes = require("./routes/googleAuthRoutes");
app.use(googleAuthRoutes);

const jwt = require("jsonwebtoken");

// Global middleware to expose user to all views
app.use((req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Simulate or fetch user data here
      res.locals.user = {
        name: "Tapan",
        avatar: "https://i.pravatar.cc/40?img=3"
      };
    } catch (err) {
      res.locals.user = null;
    }
  } else {
    res.locals.user = null;
  }

  next();
});


// Routes - Frontend Views
app.use("/", viewRoutes);
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}
app.get("/dashboard", isLoggedIn, (req, res) => {
  res.render("dashboard", {
    layout: "layout",
    title: "Dashboard | ReWear",
    user: req.user
  });
});
// Routes - Backend APIs
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// Global Error Handler
app.use(errorHandler);



// Server Start on Port 8080
const PORT = 8080;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));

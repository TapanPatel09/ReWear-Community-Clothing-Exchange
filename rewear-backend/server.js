const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// DB Connection
require("./config/db")();

// Routes
app.get("/", (req, res) => {
    res.send("Welcome to ReWear API");
});

app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);


// Error Handler
app.use(errorHandler);

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

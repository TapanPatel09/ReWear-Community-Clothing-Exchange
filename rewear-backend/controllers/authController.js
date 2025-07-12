const User = require("../models/User");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already exists" });

    // No manual hashing needed — the model will hash it automatically
    const user = await User.create({ name, email, password });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, { httpOnly: true });
res.redirect("/dashboard");
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "Login successful", user: { name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, login };

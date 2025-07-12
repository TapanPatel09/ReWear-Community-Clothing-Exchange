const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

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

// Demo items (fallback for dashboard)
const demoItems = [
  {
    name: "Denim Jacket",
    description: "Stylish blue denim jacket for casual wear.",
    size: "M",
    category: "Men",
    imageUrl: "https://source.unsplash.com/300x200/?jacket"
  },
  {
    name: "Summer Dress",
    description: "Light floral dress perfect for summer.",
    size: "S",
    category: "Women",
    imageUrl: "https://source.unsplash.com/300x200/?dress"
  },
  {
    name: "Kid's Hoodie",
    description: "Comfy and warm hoodie for kids.",
    size: "XS",
    category: "Kids",
    imageUrl: "https://source.unsplash.com/300x200/?hoodie"
  },
  {
    name: "Woolen Scarf",
    description: "Winter scarf for warmth and style.",
    size: "Free",
    category: "Accessories",
    imageUrl: "https://source.unsplash.com/300x200/?scarf"
  },
  {
    name: "T-shirt",
    description: "Casual cotton t-shirt for daily wear.",
    size: "L",
    category: "Men",
    imageUrl: "https://source.unsplash.com/300x200/?tshirt"
  }
];

// Dashboard Page - with real or fake data
router.get("/dashboard", async (req, res) => {
  try {
    const response = await fetch("http://localhost:8080/api/items");
    let items = await response.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      items = demoItems;
    }

    res.render("dashboard", {
      layout: "layout",
      title: "Dashboard | ReWear",
      items
    });
  } catch (err) {
    res.render("dashboard", {
      layout: "layout",
      title: "Dashboard | ReWear",
      items: demoItems
    });
  }
});

module.exports = router;

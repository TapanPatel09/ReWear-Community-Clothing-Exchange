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
    imageUrl: "https://plus.unsplash.com/premium_photo-1698260795012-99a7785109d4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Summer Dress",
    description: "Light floral dress perfect for summer outings.",
    size: "S",
    category: "Women",
    imageUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Kid's Hoodie",
    description: "Cozy and colorful hoodie for kids.",
    size: "XS",
    category: "Kids",
    imageUrl: "https://images.unsplash.com/photo-1701673072655-0b7c89ec2138?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Woolen Scarf",
    description: "Soft wool scarf ideal for winter.",
    size: "Free",
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1609803384069-19f3e5a70e75?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Casual T-shirt",
    description: "Breathable cotton t-shirt for everyday use.",
    size: "L",
    category: "Men",
    imageUrl: "https://images.unsplash.com/photo-1496070527953-98faef8b036f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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

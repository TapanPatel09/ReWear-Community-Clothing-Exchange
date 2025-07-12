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
    name: "Casual T-shirt",
    description: "Breathable cotton t-shirt for everyday use.",
    size: "L",
    category: "Men",
    imageUrl: "https://images.unsplash.com/photo-1496070527953-98faef8b036f?q=80&w=1170&auto=format&fit=crop"
  },
  {
    name: "Denim Jacket",
    description: "Stylish blue denim jacket perfect for cool evenings.",
    size: "M",
    category: "Men",
    imageUrl: "https://images.unsplash.com/photo-1618354691565-cbfa5f1e0f6f?q=80&w=1170&auto=format&fit=crop"
  },
  {
    name: "Floral Summer Dress",
    description: "Lightweight and comfortable for sunny days.",
    size: "S",
    category: "Women",
    imageUrl: "https://images.unsplash.com/photo-1583365804383-846a937b83f8?q=80&w=1170&auto=format&fit=crop"
  },
  {
    name: "Kids Hoodie",
    description: "Cozy and colorful hoodie for toddlers.",
    size: "XS",
    category: "Kids",
    imageUrl: "https://images.unsplash.com/photo-1602810317231-e0ad9893ce84?q=80&w=1170&auto=format&fit=crop"
  },
  {
    name: "Wool Scarf",
    description: "Soft wool scarf to keep you warm in winters.",
    size: "Free",
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1542060748-10c28b62716e?q=80&w=1170&auto=format&fit=crop"
  },
  {
    name: "Kurti Top",
    description: "Ethnic wear top for festive occasions.",
    size: "M",
    category: "Women",
    imageUrl: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?q=80&w=1170&auto=format&fit=crop"
  },
  {
    name: "Formal Shirt",
    description: "Slim-fit cotton shirt, ideal for office.",
    size: "L",
    category: "Men",
    imageUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1170&auto=format&fit=crop"
  },
  {
    name: "Track Pants",
    description: "Comfortable pants for sports and casual wear.",
    size: "M",
    category: "Men",
    imageUrl: "https://images.unsplash.com/photo-1626123902231-6f99e37dbe45?q=80&w=1170&auto=format&fit=crop"
  },
  {
    name: "Printed Skirt",
    description: "Floral print skirt for casual outings.",
    size: "S",
    category: "Women",
    imageUrl: "https://images.unsplash.com/photo-1587837073080-448bc6b7a186?q=80&w=1170&auto=format&fit=crop"
  },
  {
    name: "Wool Beanie",
    description: "Knitted cap to stay warm in winter.",
    size: "Free",
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1602810317333-8a23e5f6a727?q=80&w=1170&auto=format&fit=crop"
  },
  {
    name: "Sports Shoes",
    description: "Running shoes with breathable mesh.",
    size: "10",
    category: "Men",
    imageUrl: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba0?q=80&w=1170&auto=format&fit=crop"
  },
  {
    name: "Saree",
    description: "Traditional silk saree with gold border.",
    size: "Free",
    category: "Women",
    imageUrl: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Boy's T-shirt",
    description: "Cartoon-printed cotton t-shirt for kids.",
    size: "S",
    category: "Kids",
    imageUrl: "https://images.unsplash.com/photo-1636573563446-5cd9479b75ba?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Sunglasses",
    description: "UV-protected sunglasses for sunny days.",
    size: "Free",
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1502767089025-6572583495f9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dh"
  },
  {
    name: "Ankle Boots",
    description: "Leather boots with comfortable sole.",
    size: "7",
    category: "Women",
    imageUrl: "https://images.unsplash.com/photo-1707676179930-b2a8d251288a?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Jogger Pants",
    description: "Stylish joggers with elastic fit.",
    size: "M",
    category: "Men",
    imageUrl: "https://images.unsplash.com/photo-1715532098035-a343b26eaeaa?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Leather Belt",
    description: "Classic black leather belt for men.",
    size: "Free",
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1711702362126-cf17f475d825?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Sweater",
    description: "Woolen sweater for chilly evenings.",
    size: "L",
    category: "Women",
    imageUrl: "https://images.unsplash.com/photo-1631541909061-71e349d1f203?q=80&w=705&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Cap",
    description: "Baseball cap with adjustable strap.",
    size: "Free",
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1513105737059-ff0cf0580ae6?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Girl's Dress",
    description: "Colorful dress for kids' parties.",
    size: "XS",
    category: "Kids",
    imageUrl: "https://plus.unsplash.com/premium_photo-1664373233029-7238db68d0a2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];


router.get("/dashboard", async (req, res) => {
  const category = req.query.category;
  const selectedCategory = category || "All";

  try {
    const response = await fetch("http://localhost:8080/api/items");
    let items = await response.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      items = demoItems;
    }

    // ✅ Apply category filter if needed
    if (category) {
      items = items.filter(item => item.category.toLowerCase() === category.toLowerCase());
    }

    res.render("dashboard", {
      layout: "layout",
      title: "Dashboard | ReWear",
      items,
      selectedCategory
    });
  } catch (err) {
    // fallback to demo items if fetch fails
    let filteredDemo = demoItems;

    if (category) {
      filteredDemo = demoItems.filter(item => item.category.toLowerCase() === category.toLowerCase());
    }

    res.render("dashboard", {
      layout: "layout",
      title: "Dashboard | ReWear",
      items: filteredDemo,
      selectedCategory
    });
  }
});

module.exports = router;

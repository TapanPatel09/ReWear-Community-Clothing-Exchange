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
    imageUrl: "https://images.unsplash.com/photo-1550504630-cc20eca3b23e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Denim Jacket",
    description: "Stylish blue denim jacket perfect for cool evenings.",
    size: "M",
    category: "Men",
    imageUrl: "https://plus.unsplash.com/premium_photo-1698260795012-99a7785109d4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8RGVuaW0lMjBKYWNrZXR8ZW58MHx8MHx8fDA%3D"
  },
  {
    name: "Floral Summer Dress",
    description: "Lightweight and comfortable for sunny days.",
    size: "S",
    category: "Women",
    imageUrl: "https://images.unsplash.com/photo-1652212036934-0d51983f6425?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Kids Hoodie",
    description: "Cozy and colorful hoodie for toddlers.",
    size: "XS",
    category: "Kids",
    imageUrl: "https://images.unsplash.com/photo-1601054704854-1a2e79dda4d3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Wool Scarf",
    description: "Soft wool scarf to keep you warm in winters.",
    size: "Free",
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1609803384069-19f3e5a70e75?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Kurti Top",
    description: "Ethnic wear top for festive occasions.",
    size: "M",
    category: "Women",
    imageUrl: "https://images.unsplash.com/photo-1708534246051-7f47b279e94b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Formal Shirt",
    description: "Slim-fit cotton shirt, ideal for office.",
    size: "L",
    category: "Men",
    imageUrl: "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Track Pants",
    description: "Comfortable pants for sports and casual wear.",
    size: "M",
    category: "Men",
    imageUrl: "https://images.unsplash.com/photo-1711175017307-bbacf7c2ca13?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Printed Skirt",
    description: "Floral print skirt for casual outings.",
    size: "S",
    category: "Women",
    imageUrl: "https://images.unsplash.com/photo-1649899240929-a19a0dcf02fb?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Wool Beanie",
    description: "Knitted cap to stay warm in winter.",
    size: "Free",
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1606453914790-b9be7cdb321f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Sports Shoes",
    description: "Running shoes with breathable mesh.",
    size: "10",
    category: "Men",
    imageUrl: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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

router.get("/item/:name", (req, res) => {
  const itemName = req.params.name;
  const item = demoItems.find(i => i.name === itemName);

  if (!item) {
    return res.status(404).render("404", { title: "Item not found", layout: "layout" });
  }

 res.render("itemDetail", {
  layout: "layout",
  title: item.name + " | ReWear",
  item,
  demoItems // ✅ Add this line
});

});

router.get("/user/profile", (req, res) => {
  // We'll use the globally available res.locals.user
  const user = res.locals.user;

  if (!user) {
    return res.redirect("/login");
  }

  res.render("userProfile", {
    layout: "layout",
    title: "My Profile | ReWear",
    user
  });
});


// Dummy listings for demo purposes
const fakeUserListings = demoItems.slice(0, 6);
const fakeUserPurchases = demoItems.slice(6, 12);

router.get("/user/activity", (req, res) => {
  if (!res.locals.user) return res.redirect("/login");

  const listings = demoItems.slice(0, 6);     // 🔁 Fake data for listings
  const purchases = demoItems.slice(6, 12);   // 🔁 Fake data for purchases

  res.render("userActivity", {
    layout: "layout",
    title: "My Activity | ReWear",
    user: res.locals.user,
    listings,
    purchases
  });
});


module.exports = router;

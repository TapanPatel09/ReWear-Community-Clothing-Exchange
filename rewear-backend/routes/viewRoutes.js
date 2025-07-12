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
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1170&auto=format&fit=crop"
  },
  {
    name: "Boy's T-shirt",
    description: "Cartoon-printed cotton t-shirt for kids.",
    size: "S",
    category: "Kids",
    imageUrl: "https://images.unsplash.com/photo-1611222542365-1c2241df6b14?q=80&w=1170&auto=format&fit=crop"
  },
  {
    name: "Sunglasses",
    description: "UV-protected sunglasses for sunny days.",
    size: "Free",
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1559561854-ecfbdc168f50?q=80&w=1170&auto=format&fit=crop"
  },
  {
    name: "Ankle Boots",
    description: "Leather boots with comfortable sole.",
    size: "7",
    category: "Women",
    imageUrl: "https://images.unsplash.com/photo-1603808033190-6fbf6f76b1c1?q=80&w=1170&auto=format&fit=crop"
  },
  {
    name: "Jogger Pants",
    description: "Stylish joggers with elastic fit.",
    size: "M",
    category: "Men",
    imageUrl: "https://images.unsplash.com/photo-1617634667033-40443fc3dca6?q=80&w=1170&auto=format&fit=crop"
  },
  {
    name: "Leather Belt",
    description: "Classic black leather belt for men.",
    size: "Free",
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1592878849120-bf4f3f79f321?q=80&w=1170&auto=format&fit=crop"
  },
  {
    name: "Sweater",
    description: "Woolen sweater for chilly evenings.",
    size: "L",
    category: "Women",
    imageUrl: "https://images.unsplash.com/photo-1605529447592-0fabc19b03fa?q=80&w=1170&auto=format&fit=crop"
  },
  {
    name: "Cap",
    description: "Baseball cap with adjustable strap.",
    size: "Free",
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1564836235913-44c7552e4f04?q=80&w=1170&auto=format&fit=crop"
  },
  {
    name: "Girl's Dress",
    description: "Colorful dress for kids' parties.",
    size: "XS",
    category: "Kids",
    imageUrl: "https://images.unsplash.com/photo-1618354691268-f6f171c5e45d?q=80&w=1170&auto=format&fit=crop"
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

require('dotenv').config();
const mongoose = require('mongoose');
const Item = require('./models/Item');

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rewear';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


async function seed() {
  try {
    // Optional: clear old items
    await Item.deleteMany();

    const items = [
      {
        name: "Classic T-Shirt",
        description: "Comfortable cotton T-shirt for daily wear.",
        imageUrl: "https://via.placeholder.com/300x400?text=Classic+T-Shirt",
        category: "Men",
        condition: "Like New",
        points: 15,
        approved: true,
      },
      {
        name: "Summer Dress",
        description: "Light and breezy dress perfect for warm weather.",
        imageUrl: "https://via.placeholder.com/300x400?text=Summer+Dress",
        category: "Women",
        condition: "New",
        points: 25,
        approved: true,
      },
      {
        name: "Kids Sneakers",
        description: "Durable sneakers for active kids.",
        imageUrl: "https://via.placeholder.com/300x400?text=Kids+Sneakers",
        category: "Kids",
        condition: "Used",
        points: 10,
        approved: true,
      },
      {
        name: "Denim Jeans",
        description: "Classic blue denim jeans for everyday style.",
        imageUrl: "https://via.placeholder.com/300x400?text=Denim+Jeans",
        category: "Men",
        condition: "Used",
        points: 20,
        approved: true,
      },
      {
        name: "Leather Jacket",
        description: "Stylish leather jacket, perfect for cooler evenings.",
        imageUrl: "https://via.placeholder.com/300x400?text=Leather+Jacket",
        category: "Unisex",
        condition: "Like New",
        points: 40,
        approved: true,
      },
      {
        name: "Wool Scarf",
        description: "Warm wool scarf for winter months.",
        imageUrl: "https://via.placeholder.com/300x400?text=Wool+Scarf",
        category: "Unisex",
        condition: "New",
        points: 8,
        approved: true,
      },
      {
        name: "Baseball Cap",
        description: "Casual cap for sunny days.",
        imageUrl: "https://via.placeholder.com/300x400?text=Baseball+Cap",
        category: "Men",
        condition: "New",
        points: 5,
        approved: true,
      },
      {
        name: "Evening Gown",
        description: "Elegant gown for special occasions.",
        imageUrl: "https://via.placeholder.com/300x400?text=Evening+Gown",
        category: "Women",
        condition: "Like New",
        points: 50,
        approved: true,
      },
      {
        name: "Yoga Pants",
        description: "Comfortable leggings suitable for workouts.",
        imageUrl: "https://via.placeholder.com/300x400?text=Yoga+Pants",
        category: "Women",
        condition: "New",
        points: 12,
        approved: true,
      },
      {
        name: "Raincoat",
        description: "Waterproof raincoat for wet weather.",
        imageUrl: "https://via.placeholder.com/300x400?text=Raincoat",
        category: "Unisex",
        condition: "Used",
        points: 18,
        approved: true,
      },
      {
        name: "Baby Romper",
        description: "Soft cotton romper for babies.",
        imageUrl: "https://via.placeholder.com/300x400?text=Baby+Romper",
        category: "Kids",
        condition: "New",
        points: 7,
        approved: true,
      },
      {
        name: "Sneakers",
        description: "Comfortable running shoes for daily wear.",
        imageUrl: "https://via.placeholder.com/300x400?text=Sneakers",
        category: "Men",
        condition: "Used",
        points: 12,
        approved: true,
      },
      {
        name: "Winter Gloves",
        description: "Warm gloves for cold weather.",
        imageUrl: "https://via.placeholder.com/300x400?text=Winter+Gloves",
        category: "Unisex",
        condition: "New",
        points: 6,
        approved: true,
      },
      {
        name: "Formal Shirt",
        description: "Perfect for office wear or events.",
        imageUrl: "https://via.placeholder.com/300x400?text=Formal+Shirt",
        category: "Men",
        condition: "Like New",
        points: 14,
        approved: true,
      },
      {
        name: "Sun Hat",
        description: "Wide-brimmed hat for sunny days.",
        imageUrl: "https://via.placeholder.com/300x400?text=Sun+Hat",
        category: "Women",
        condition: "New",
        points: 9,
        approved: true,
      }
    ];

    await Item.insertMany(items);
    console.log("✅ Seeded 15 items successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error(error);
  }
}

seed();

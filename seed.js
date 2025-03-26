const connectDB = require("./db/connection"); // Import the connection function
const Product = require("./models/Product"); // Import the Product model
const products = require("./json/products.json"); // Import the products JSON file

const seedDatabase = async () => {
  try {
    // Connect to the database
    await connectDB();

    console.log("Connected to the database. Seeding data...");

    // Clear existing data
    await Product.deleteMany();
    console.log("Cleared existing products.");

    // Insert new data
    await Product.insertMany(products);
    console.log("Database seeded successfully!");

    // Close the connection
    process.exit();
  } catch (error) {
    console.error("Error seeding the database:", error.message);
    process.exit(1);
  }
};

seedDatabase();
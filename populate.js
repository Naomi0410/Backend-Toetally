// Load environment variables from a .env file into process.env.
require("dotenv").config();

// Import Mongoose to handle MongoDB operations.
const mongoose = require("mongoose");

// Import the Product model which defines the product schema in MongoDB.
const productModel = require("./models/Product");

// Import product data from a JSON file. This file contains an array of product objects.
const productAPI = require("./json/products.json");

// Define an asynchronous function "upload" to perform database operations.
const upload = async () => {
  try {
    // Connect to the MongoDB database using the connection string from environment variables.
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected");

    // Inform that previous product records are going to be deleted.
    console.log("Deleting previous records...");

    // Delete all existing product documents in the collection.
    await productModel.deleteMany();
    console.log("Previous records deleted successfully");

    // Inform that the new/updated product records are about to be uploaded.
    console.log("Uploading updated/new records");

    // Try to create new product documents in the database using the JSON data.
    try {
      await productModel.create(productAPI);
      // Log the product data to confirm what is being uploaded.
      console.log(productAPI);
      console.log("Products uploaded successfully");
    } catch (creationError) {
      // If an error occurs during product creation, log the error details.
      console.error("Error uploading products:", creationError);
    }

    // Exit the process with a success status code.
    process.exit(0);
  } catch (error) {
    // If any error occurs during the connection or deletion process, log the error message.
    console.error("Error:", error.message);
    console.log("Unable to connect");
    // Exit the process with a failure status code.
    process.exit(1);
  }
};

// Execute the upload function.
upload();

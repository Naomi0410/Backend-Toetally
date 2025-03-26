require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = require("./app");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const connectDB = require("./db/connection");



// Subscribe Endpoint
app.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    const subscriber = new Subscriber({ email });
    await subscriber.save();

    // Nodemailer Setup
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Newsletter Subscription",
      text: "Thank you for subscribing to our newsletter!",
    });

    res.status(201).json({ message: "Subscribed successfully!" });
  } catch (error) {
    console.error("Error in subscription:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.use(express.json()); // Middleware to parse JSON

app.get("/", (req, res) => {
  res.send("Welcome to Contact Form API");
});

// Start Server
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connectDB();
    console.log("Connected to the database successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to the database:", err.message);
    process.exit(1);
  }
};

startServer();

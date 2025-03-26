const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST Route: Handle Contact Form Submission
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate request
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Save to database
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res
      .status(201)
      .json({ message: "✅ Contact form submitted successfully!" });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

module.exports = router;

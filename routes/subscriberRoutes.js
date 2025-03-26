const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");

// 📌 POST Route: Subscribe to Newsletter
router.post("/", async (req, res) => {
    try {
        const { email } = req.body;

        // Validate email
        if (!email || !email.includes("@")) {
            return res.status(400).json({ error: "Invalid email address." });
        }

        // Check if email already subscribed
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({ error: "Email is already subscribed." });
        }

        // Save to database
        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();

        res.status(201).json({ message: "✅ Successfully subscribed!" });
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
});

// 📌 GET Route: Get All Subscribers
router.get("/", async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.status(200).json(subscribers);
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
});

module.exports = router;

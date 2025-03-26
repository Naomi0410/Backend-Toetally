const express = require("express");

const createPaymentIntent = require("../controllers/paymentController");

const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/create-intent", authenticate, createPaymentIntent);

module.exports = router;

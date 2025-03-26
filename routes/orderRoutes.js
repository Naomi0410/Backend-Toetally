const express = require("express");

const createOrder = require("../controllers/orderController");

const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authenticate, createOrder);

module.exports = router;

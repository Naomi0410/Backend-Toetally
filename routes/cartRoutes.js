const express = require("express");
const {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  incrementQuantity,
  decrementQuantity, // Import the new functions
} = require("../controllers/cartController");

const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authenticate, getCart);
router.post("/add", authenticate, addToCart);
router.put("/:productId", authenticate, updateQuantity);
router.delete("/:productId", authenticate, removeFromCart);
router.patch("/increment/:productId", authenticate, incrementQuantity); // NEW: Increment route
router.patch("/decrement/:productId", authenticate, decrementQuantity); // NEW: Decrement route

module.exports = router;

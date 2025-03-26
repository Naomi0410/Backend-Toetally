const Cart = require("../models/Cart");
const Product = require("../models/Product");

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();

    const updatedCart = await Cart.findOne({ user: userId }).populate(
      "items.product",
    );

    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: "Error adding to cart" });
  }
};

const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product",
    );

    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
      await cart.save();
    }

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart" });
  }
};

const updateQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity = quantity;
    await cart.save();

    const updatedCart = await Cart.findOne({ user: userId }).populate(
      "items.product",
    );

    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: "Error updating quantity" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId,
    );

    await cart.save();

    const updatedCart = await Cart.findOne({ user: userId }).populate(
      "items.product",
    );

    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: "Error removing item" });
  }
};

// NEW: Increment quantity
const incrementQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity += 1;
    await cart.save();

    const updatedCart = await Cart.findOne({ user: userId }).populate(
      "items.product",
    );

    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: "Error incrementing quantity" });
  }
};

// NEW: Decrement quantity
const decrementQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId,
      );
    }

    await cart.save();

    const updatedCart = await Cart.findOne({ user: userId }).populate(
      "items.product",
    );

    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: "Error decrementing quantity" });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateQuantity,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
};

const Product = require("../models/Product");

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

const rateProduct = async (req, res, next) => {
  const { id } = req.params;

  const { rating } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5." });
  }

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    product.ratings.count += 1;

    product.ratings.sum += rating;

    product.ratings.average = product.ratings.sum / product.ratings.count;

    await product.save();

    res.status(200).json({
      message: "Rating submitted successfully.",
      updatedRatings: product.ratings,
    });
  } catch (err) {
    next(err);
  }
};

const likeProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userId = req.user.id;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const likedByIds = product.likedBy.map((uid) => uid.toString());

    if (!likedByIds.includes(userId.toString())) {
      product.likedBy.push(userId);

      product.likes = product.likedBy.length;

      await product.save();
    }

    res.status(200).json({
      message: "Product liked",
      likes: product.likes,
      likedBy: product.likedBy,
    });
  } catch (err) {
    next(err);
  }
};

const unlikeProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userId = req.user.id;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    product.likedBy = product.likedBy.filter(
      (uid) => uid.toString() !== userId.toString(),
    );

    product.likes = product.likedBy.length;

    await product.save();

    res.status(200).json({
      message: "Product unliked",
      likes: product.likes,
      likedBy: product.likedBy,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  rateProduct,
  likeProduct,
  unlikeProduct,
};

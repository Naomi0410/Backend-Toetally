const mongoose = require("mongoose");
const { Schema } = mongoose;

const productTagEnum = [
  "ADIDAS",
  "NIKE",
  "PUMA",
  "LOUIS VUITTON",
  "BALENCIAGA",
  "UNDER ARMOUR",
  "Christian Louboutin",
  "Skechers",
  "New Balance",
];

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    productTag: {
      type: String,
      enum: productTagEnum,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    color: {
      type: String,
      required: true,
    },

    size: {
      type: [Number],
      required: true,
    },

    image: {
      type: [String],
      required: true,
    },

    thumbnail: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    logo: {
      type: [String],
      required: true,
    },

    productDetails: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      enum: ["newarrivals", "offers", "discount"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", ProductSchema);

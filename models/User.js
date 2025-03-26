const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please add your firstname"],
    maxlength: [50, "Name must not be more than 50 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Please add your lastname"],
    maxlength: [50, "Name must not be more than 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true, 
    match: [
      /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: [8, "Password must be more than 8 characters"],
  },
});

module.exports = mongoose.model("User", userSchema);

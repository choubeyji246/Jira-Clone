const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Please enter your name"] },
    email: {
      type: String,
      unique: true,
      validate: [isEmail, "invalid email"],
      required: [true, "Please enter your email"],
    },
    password: { type: String, required: [true, "Please enter a password"] },
    phone: {
      type: String,
      required: [true, "Please enter your contact number"],
    },
  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);
module.exports = { user };

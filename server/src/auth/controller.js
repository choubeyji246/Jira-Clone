const bcrypt = require("bcryptjs");

const response = require("../utils/successResponse");
const { user } = require("./model");
const { AppError } = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");

let responseObject = {
  message: "",
  data: null,
};
const SALT_ROUNDS = 10;

const createUser = async (req, res, next) => {
  try {
    const { password } = req.body;
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    req.body.password = await bcrypt.hash(password, salt);
    const data = await user.create(req.body);
    responseObject = { message: "Users registered successfully", data: data };
    res.status(201).send(response(200, responseObject));
  } catch (error) {
    console.log(error);
    const customError = new AppError(500, error.message);
    next(customError);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    let userData = await user.findOne({ email });

    if (!userData) {
      throw new AppError(400, "Invalid Email or Password");
    }

    const isPasswordMatched = await bcrypt.compare(password, userData.password);

    if (!isPasswordMatched) {
      throw new AppError(400, "Invalid Email or Password");
    }

    const token = jwt.sign(
      { email: userData.email, userId: userData._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.EXPIRES_IN }
    );

    const responseObject = { data: token, message: "Logged In Successfully" };
    res.status(200).send(response(200, responseObject));
  } catch (error) {
    const customError = new AppError(error.statusCode || 500, error.message);
    next(customError);
  }
};

module.exports = { createUser, loginUser };

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
} = require("../utils/customErrors");
const ERROR_CODES = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const createUser = (req, res, next) => {
  console.log("Request body:", req.body);
  const { email, password } = req.body;
  // Accept either `username` or `name` from client; prefer `username` if provided
  const username = req.body.username || req.body.name;

  if (!email || !password || !username) {
    return next(
      new BadRequestError("username, email and password are required")
    );
  }

  const normalizedEmail = email.trim().toLowerCase();

  return bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        username,
        email: normalizedEmail,
        password: hash,
      })
    )
    .then((user) => {
      const userObject = user.toObject();
      delete userObject.password; // never send password back
      res.status(ERROR_CODES.CREATED.code).send(userObject);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data passed to create user"));
      } else if (err.code === 11000) {
        // Prefer dynamic field mention if available
        const conflictField = Object.keys(err.keyPattern || {})[0] || "email";
        const msg =
          conflictField === "email"
            ? "User with this email already exists"
            : `User with this ${conflictField} already exists`;
        next(new ConflictError(msg));
      } else {
        next(err);
      }
    });
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(ERROR_CODES.OK.code).send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("User not found"));
      } else if (err.name === "CastError") {
        next(new BadRequestError("The id string is in an invalid format"));
      } else {
        next(err);
      }
    });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new BadRequestError("Email and password are required"));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(ERROR_CODES.OK.code).send({ token });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data passed for login"));
      } else if (err.message === "Incorrect email or password") {
        next(new UnauthorizedError("Incorrect email or password"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  getCurrentUser,
  loginUser,
};

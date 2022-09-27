import asyncHandler from "express-async-handler";
import pool from "../db/index.js";
import generateToken from "../utils/generateToken.js";
import { matchPassword, hashPassword } from "../utils/passwordHelpers.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  let user = await pool.query("SELECT * FROM users WHERE email = $1 LIMIT 1", [
    email,
  ]);
  [user] = user.rows;

  if (user && (await matchPassword(password, user.password))) {
    res.json({
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      is_admin: user.is_admin,
      token: generateToken(user.user_id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await pool.query(
    "SELECT email FROM users WHERE email = $1 LIMIT 1",
    [email]
  );

  if (userExists.rows.length > 0) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  let user = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING user_id, name, email, is_admin",
    [name, email, hashedPassword]
  );
  [user] = user.rows;

  if (user) {
    res.status(201).json({
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      is_admin: user.is_admin,
      token: generateToken(user.user_id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
/*

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

*/
export { authUser, registerUser };

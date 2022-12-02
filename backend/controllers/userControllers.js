import asyncHandler from "express-async-handler";
import pool from "../db/index.js";
import {
  authUserHistogramMetrics,
  registerUserHistogramMetrics,
} from "../metrics/histogram/userHistogramMetrics.js";
import generateToken from "../utils/generateToken.js";
import { matchPassword, hashPassword } from "../utils/passwordHelpers.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const timer = authUserHistogramMetrics.startTimer();

  const {
    rows: [user],
  } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

  if (user && (await matchPassword(password, user.password))) {
    timer({ operation: "authUser", email });

    res.json({
      token: generateToken(user.id),
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

  const timer = registerUserHistogramMetrics.startTimer();

  const userExists = await pool.query(
    "SELECT email FROM users WHERE email = $1",
    [email]
  );

  if (userExists.rows.length > 0) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const {
    rows: [user],
  } = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id",
    [name, email, hashedPassword]
  );

  if (user) {
    timer({ operation: "registerUser" });

    res.status(201).json({
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const {
    rows: [user],
  } = await pool.query(
    "SELECT id, name, email, is_admin, AGE(created_at) AS created_at FROM users WHERE id = $1",
    [req.user.id]
  );

  if (user) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      is_admin: user.is_admin,
      created_at:
        Object.keys(user.created_at).length === 0 ? "0" : user.created_at,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  if (!req.body.password) {
    res.status(404);
    throw new Error("User didn't provide password");
  }

  const {
    rows: [user],
  } = await pool.query("SELECT id, name, email FROM users WHERE id = $1", [
    req.user.id,
  ]);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    const hashedPassword = await hashPassword(req.body.password);

    const {
      rows: [updatedUser],
    } = await pool.query(
      `UPDATE users
      SET name = $2,
          email = $3,
          password = $4
      WHERE id = $1
      RETURNING name, email`,
      [req.user.id, user.name, user.email, hashedPassword]
    );

    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { authUser, registerUser, getUserProfile, updateUserProfile };

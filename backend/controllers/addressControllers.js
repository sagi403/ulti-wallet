import asyncHandler from "express-async-handler";
import pool from "../db/index.js";

// @desc    Get user addresses
// @route   GET /api/address
// @access  Private
const getUserAddresses = asyncHandler(async (req, res) => {
  const {
    rows: [user],
  } = await pool.query("SELECT id FROM users WHERE id = $1", [req.user.id]);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const { rows: userAddresses } = await pool.query(
    "SELECT * FROM addresses WHERE user_id = $1",
    [user.id]
  );

  if (userAddresses.length === 0) {
    res.status(404);
    throw new Error("Address not found for this user");
  }

  res.json(userAddresses);
});

// @desc    Get address coins
// @route   GET /api/address/coins
// @access  Private
const getAddressCoins = asyncHandler(async (req, res) => {
  const { rows: address } = await pool.query(
    "SELECT * FROM addresses INNER JOIN coins ON addresses.coin_id = coins.id WHERE public_address = $1",
    [req.body.id]
  );

  if (address.length === 0) {
    res.status(404);
    throw new Error("Address not found");
  }

  res.json(address);
});

export { getUserAddresses, getAddressCoins };

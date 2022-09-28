import asyncHandler from "express-async-handler";
import pool from "../db/index.js";

// @desc    Get user addresses
// @route   GET /api/address
// @access  Private
const getUserAddress = asyncHandler(async (req, res) => {
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

  if (userAddresses) {
    res.json(userAddresses);
  } else {
    res.status(404);
    throw new Error("Address not found for this user");
  }
});

// // @desc    Get address coins
// // @route   GET /api/address/coins
// // @access  Private
// const getAddressCoins = asyncHandler(async (req, res) => {
//   let address = await Address.findById(req.body.id);
//   address = address.coins.map(coin => coin.populate("coin", "name"));

//   if (!address) {
//     res.status(404);
//     throw new Error("Address not found");
//   }

//   res.json(address);
// });
// // need fix!!!!!!!!!!!!!!!!!!!!!

export { getUserAddress };

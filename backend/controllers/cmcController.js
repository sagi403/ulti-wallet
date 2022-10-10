import asyncHandler from "express-async-handler";
import pool from "../db/index.js";

// @desc    Get CMC coins data
// @route   GET /api/cmc
// @access  Private
const getCmcCoins = asyncHandler(async (req, res) => {
  const { rows: coins } = await pool.query("SELECT * FROM coins");
  res.json(coins);
});

export { getCmcCoins };

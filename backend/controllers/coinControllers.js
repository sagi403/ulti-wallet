import asyncHandler from "express-async-handler";
import pool from "../db/index.js";

// @desc    Get user coins
// @route   GET /api/coins
// @access  Private
const getUserCoins = asyncHandler(async (req, res) => {
  const { rows: coins } = await pool.query(
    "SELECT * FROM addresses INNER JOIN coins ON addresses.coin_symbol = coins.symbol WHERE user_id = $1",
    [req.user.id]
  );

  if (coins.length === 0) {
    res.status(404);
    throw new Error("Coin not found");
  }

  res.json(coins);
});

// @desc    Get coins id
// @route   GET /api/coins/coinsId
// @access  Private
const getCoinsId = asyncHandler(async (req, res) => {
  const { rows: coins } = await pool.query(
    "SELECT coins.id FROM addresses INNER JOIN coins ON addresses.coin_symbol = coins.symbol WHERE user_id = $1",
    [req.user.id]
  );

  if (coins.length === 0) {
    res.status(404);
    throw new Error("Coin not found");
  }

  const coinsId = [];

  for (let coin of coins) {
    const { id } = coin;

    if (!coinsId.includes(id)) {
      coinsId.push(id);
    }
  }

  res.json(coinsId);
});

export { getUserCoins, getCoinsId };

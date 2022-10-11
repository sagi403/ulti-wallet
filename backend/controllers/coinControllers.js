import asyncHandler from "express-async-handler";
import pool from "../db/index.js";

// @desc    Get coins extended information
// @route   GET /api/coins
// @access  Private
const getCoinsInfo = asyncHandler(async (req, res) => {
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

// @desc    Get coins basic information
// @route   GET /api/coins/basic
// @access  Private
const getCoinsBasicInfo = asyncHandler(async (req, res) => {
  const { rows: coins } = await pool.query(
    `SELECT coins.id, symbol, name, logo, SUM(balance) AS balance 
    FROM addresses INNER JOIN coins ON 
    addresses.coin_symbol = coins.symbol 
    WHERE user_id = $1 
    GROUP BY coins.id, symbol, name, logo`,
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
    `SELECT coins.id FROM addresses 
    INNER JOIN coins ON 
    addresses.coin_symbol = coins.symbol 
    WHERE user_id = $1 
    GROUP BY coins.id`,
    [req.user.id]
  );

  if (coins.length === 0) {
    res.status(404);
    throw new Error("Coin not found");
  }

  const coinsId = coins.map(coin => coin.id);

  res.json(coinsId);
});

export { getCoinsInfo, getCoinsBasicInfo, getCoinsId };

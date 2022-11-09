import asyncHandler from "express-async-handler";
import pool from "../db/index.js";

// @desc    Get coins extended information
// @route   GET /api/coins
// @access  Private
const getCoinsInfo = asyncHandler(async (req, res) => {
  const { rows: coins } = await pool.query(
    "SELECT * FROM addresses INNER JOIN coins ON addresses.coin_id = coins.id WHERE user_id = $1",
    [req.user.id]
  );

  if (coins.length === 0) {
    res.status(404);
    throw new Error("Coin not found");
  }

  res.json(coins);
});

// @desc    Get user coins basic information
// @route   GET /api/coins/basic
// @access  Private
const getCoinsBasicInfo = asyncHandler(async (req, res) => {
  const { rows: coins } = await pool.query(
    `SELECT coins.id, symbol, name, logo, color, SUM(balance) AS balance
    FROM addresses INNER JOIN coins ON 
    addresses.coin_id = coins.id 
    WHERE user_id = $1 AND balance != 0
    GROUP BY coins.id, symbol, name, logo, color`,
    [req.user.id]
  );

  if (coins.length === 0) {
    res.status(404);
    throw new Error("Coin not found");
  }

  res.json(coins);
});

// @desc    Get all coins basic information
// @route   GET /api/coins/basicAll
// @access  Private
const getAllCoinsBasicInfo = asyncHandler(async (req, res) => {
  const { rows: coins } = await pool.query(
    `SELECT coins.id, symbol, name, logo, color, balance FROM coins
    LEFT JOIN
    (SELECT coins.id, SUM(balance) AS balance
    FROM addresses INNER JOIN coins ON 
    addresses.coin_id = coins.id 
    WHERE user_id = $1 
    GROUP BY coins.id) AS result
    ON result.id = coins.id
    ORDER BY balance DESC NULLS LAST`,
    [req.user.id]
  );

  if (coins.length === 0) {
    res.status(404);
    throw new Error("Coin not found");
  }

  res.json(coins);
});

// @desc    Get user coins id
// @route   GET /api/coins/coinsId
// @access  Private
const getCoinsId = asyncHandler(async (req, res) => {
  const { rows: coins } = await pool.query(
    `SELECT coin_id FROM addresses 
    WHERE user_id = $1 
    GROUP BY coin_id`,
    [req.user.id]
  );

  if (coins.length === 0) {
    res.status(404);
    throw new Error("Coin not found");
  }

  const coinsId = coins.map(coin => coin.coin_id);

  res.json(coinsId);
});

// @desc    Get all coins id
// @route   GET /api/coins/coinsIdAll
// @access  Private
const getAllCoinsId = asyncHandler(async (req, res) => {
  const { rows: coins } = await pool.query(`SELECT id FROM coins`);

  if (coins.length === 0) {
    res.status(404);
    throw new Error("Coin not found");
  }

  const coinsId = coins.map(coin => coin.id);

  res.json(coinsId);
});

export {
  getCoinsInfo,
  getCoinsBasicInfo,
  getCoinsId,
  getAllCoinsBasicInfo,
  getAllCoinsId,
};

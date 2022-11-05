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
    `SELECT coins.id, symbol, name, logo, color, CAST(SUM(balance) AS FLOAT) AS balance
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

// @desc    Update coins swapping
// @route   PUT /api/coins/swap
// @access  Private
const updateSwapCoins = asyncHandler(async (req, res) => {
  const { firstCoinAmount, secondCoinAmount, oldCoinId, newCoinId } = req.body;

  if (
    typeof firstCoinAmount !== "number" ||
    typeof secondCoinAmount !== "number" ||
    typeof oldCoinId !== "number" ||
    typeof newCoinId !== "number"
  ) {
    res.status(400);
    throw new Error("Invalid swap information");
  }

  const client = await pool.connect();

  try {
    const {
      rows: [amount],
    } = await client.query(
      `SELECT CAST(SUM(balance) AS FLOAT) AS balance
      FROM addresses
      WHERE user_id = $1 AND coin_id = $2`,
      [req.user.id, oldCoinId]
    );

    if (!amount || amount.balance < firstCoinAmount) {
      throw new Error("You don't have enough coins for the transaction");
    }

    await client.query("BEGIN");
    await client.query(
      `UPDATE addresses
      SET balance = 0
      WHERE user_id = $1 AND coin_id = $2 AND balance != 0`,
      [req.user.id, oldCoinId]
    );

    const newFirstAmount = amount.balance - firstCoinAmount;

    const { rows: coins } = await client.query(
      `INSERT INTO addresses (user_id, coin_id, balance)
      VALUES
        ($1, $2, $3),
        ($1, $4, $5)
      RETURNING *`,
      [req.user.id, oldCoinId, newFirstAmount, newCoinId, secondCoinAmount]
    );
    await client.query("COMMIT");

    res.json(coins);
  } catch (error) {
    await client.query("ROLLBACK");
    throw new Error(error);
  } finally {
    client.release();
  }
});

// @desc    Get all coins basic information
// @route   GET /api/coins/basicAll
// @access  Private
const getAllCoinsBasicInfo = asyncHandler(async (req, res) => {
  const { rows: coins } = await pool.query(
    `SELECT coins.id, symbol, name, logo, color, balance FROM coins
    LEFT JOIN
    (SELECT coins.id, CAST(SUM(balance) AS FLOAT) AS balance
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
  updateSwapCoins,
  getCoinsId,
  getAllCoinsBasicInfo,
  getAllCoinsId,
};

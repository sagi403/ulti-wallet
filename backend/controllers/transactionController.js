import asyncHandler from "express-async-handler";
import pool from "../db/index.js";
import {
  sendCoinsHistogramMetrics,
  updateSwapCoinsHistogramMetrics,
} from "../metrics/histogram/transactionHistogramMetrics.js";

// @desc    Update coins swapping
// @route   PUT /api/transaction/swap
// @access  Private
const updateSwapCoins = asyncHandler(async (req, res) => {
  const { firstCoinAmount, secondCoinAmount, oldCoinId, newCoinId } = req.body;

  const timer = updateSwapCoinsHistogramMetrics.startTimer();

  const client = await pool.connect();

  try {
    const {
      rows: [amount],
    } = await client.query(
      `SELECT SUM(balance) AS balance
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

    timer({
      operation: "updateSwapCoins",
      first_coin_amount: firstCoinAmount,
      second_coin_amount: secondCoinAmount,
      old_coin_id: oldCoinId,
      new_coin_id: newCoinId,
    });

    res.json(coins);
  } catch (error) {
    await client.query("ROLLBACK");
    throw new Error(error);
  } finally {
    client.release();
  }
});

// @desc    Send coins
// @route   PUT /api/transaction/send
// @access  Private
const sendCoins = asyncHandler(async (req, res) => {
  const { address, sentAmount, coinId } = req.body;

  const timer = sendCoinsHistogramMetrics.startTimer();

  const client = await pool.connect();

  try {
    const {
      rows: [amount],
    } = await client.query(
      `SELECT SUM(balance) AS balance
      FROM addresses
      WHERE user_id = $1 AND coin_id = $2`,
      [req.user.id, coinId]
    );

    if (!amount || amount.balance < sentAmount) {
      throw new Error("You don't have enough coins for the transaction");
    }

    await client.query("BEGIN");
    await client.query(
      `UPDATE addresses
      SET balance = 0
      WHERE user_id = $1 AND coin_id = $2 AND balance != 0`,
      [req.user.id, coinId]
    );

    const newAmount = amount.balance - sentAmount;

    await client.query(
      `INSERT INTO addresses (user_id, coin_id, balance)
      VALUES ($1, $2, $3)`,
      [req.user.id, coinId, newAmount]
    );

    await client.query(
      `UPDATE addresses
      SET balance = balance + $3,
        used = true
      WHERE coin_id = $1 AND public_address = $2`,
      [coinId, address, sentAmount]
    );
    await client.query("COMMIT");

    timer({
      operation: "sendCoins",
      coin_id: coinId,
      sent_amount: sentAmount,
    });

    res.json("Transfer succeeded");
  } catch (error) {
    await client.query("ROLLBACK");
    throw new Error(error);
  } finally {
    client.release();
  }
});

export { updateSwapCoins, sendCoins };

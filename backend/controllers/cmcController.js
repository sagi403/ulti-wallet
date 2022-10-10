import asyncHandler from "express-async-handler";
import axios from "axios";
import pool from "../db/index.js";

// @desc    Get CMC coins data
// @route   GET /api/cmc
// @access  Private
const getCmcCoins = asyncHandler(async (req, res) => {
  const { coinsId } = req.body;

  const config = {
    headers: {
      "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
    },
  };

  const {
    data: { data },
  } = await axios.get(
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
    config
  );

  const coinsInfo = [];

  for (let coin of data) {
    if (coinsId.includes(coin.id)) {
      coinsInfo.push(coin);
    }
  }

  res.json(coinsInfo);
});

export { getCmcCoins };

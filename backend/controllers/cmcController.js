import asyncHandler from "express-async-handler";
import axios from "axios";

// @desc    Get CMC coins data
// @route   POST /api/cmc
// @access  Private
const getCmcCoins = asyncHandler(async (req, res) => {
  const { coinsId } = req.body;

  const config = {
    headers: {
      "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
      Accept: "application/json",
      "Accept-Encoding": "deflate,gzip",
    },
  };

  if (coinsId.length === 0) {
    res.status(404);
    throw new Error("Coin not found");
  }

  const {
    data: { data },
  } = await axios.get(
    `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=${coinsId.toString()}`,
    config
  );

  if (!data) {
    res.status(400);
    throw new Error("Server can’t respond due to client error");
  }

  res.json(data);
});

export { getCmcCoins };

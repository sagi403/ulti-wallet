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

  const {
    data: { data },
  } = await axios.get(
    `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=${coinsId.toString()}`,
    config
  );

  res.json(data);
});

export { getCmcCoins };

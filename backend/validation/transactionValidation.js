import { body } from "express-validator";
import coins from "../data/coins.js";

export const updateSwapCoinsValidation = [
  body("firstCoinAmount").isNumeric(),
  body("secondCoinAmount").isNumeric(),
  body("oldCoinId")
    .isNumeric()
    .custom(value => coins.find(coin => coin.id === value)),
  body("newCoinId")
    .isNumeric()
    .custom(value => coins.find(coin => coin.id === value)),
];

export const sendCoinsValidation = [
  body("address").matches(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
  ),
  body("sentAmount").isNumeric(),
  body("coinId")
    .isNumeric()
    .custom(value => coins.find(coin => coin.id === value)),
];

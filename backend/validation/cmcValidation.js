import { body } from "express-validator";
import coins from "../data/coins.js";

export const getCmcCoinsValidation = [
  body("coinsId")
    .isArray({ min: 1, max: coins.length })
    .custom(value => value.every(Number.isInteger)),
];

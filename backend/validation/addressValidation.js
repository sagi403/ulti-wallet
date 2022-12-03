import { body } from "express-validator";

export const createUserAddressValidation = [body("coinId").isNumeric()];

export const getAddressCoinsValidation = [
  body("id")
    .matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
    .trim(),
];

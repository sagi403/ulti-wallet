import { body } from "express-validator";

export const authUserValidation = [
  body("email").isEmail(),
  body("password").trim().notEmpty(),
];

export const registerUserValidation = [
  body("email").isEmail(),
  body("password").trim().isLength({ min: 4, max: 20 }),
];

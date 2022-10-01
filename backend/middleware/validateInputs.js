import { validationResult } from "express-validator";

const validateInputs = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  next();
};

export default validateInputs;

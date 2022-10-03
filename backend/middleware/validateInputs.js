import { validationResult } from "express-validator";

const validateInputs = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error("Invalid information provided");
  }

  next();
};

export default validateInputs;

import express from "express";
import {
  sendCoins,
  updateSwapCoins,
} from "../controllers/transactionController.js";
import { protect } from "../middleware/authMiddleware.js";
import validateInputs from "../middleware/validateInputs.js";
import {
  sendCoinsValidation,
  updateSwapCoinsValidation,
} from "../validation/transactionValidation.js";

const router = express.Router();

router.put(
  "/swap",
  updateSwapCoinsValidation,
  validateInputs,
  protect,
  updateSwapCoins
);
router.put("/send", sendCoinsValidation, validateInputs, protect, sendCoins);

export default router;

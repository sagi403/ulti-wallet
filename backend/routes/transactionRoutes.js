import express from "express";
import {
  sendCoins,
  updateSwapCoins,
} from "../controllers/transactionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/swap").put(protect, updateSwapCoins);
router.route("/send").put(protect, sendCoins);

export default router;

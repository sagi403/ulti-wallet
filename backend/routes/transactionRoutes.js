import express from "express";
import { updateSwapCoins } from "../controllers/transactionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/swap").put(protect, updateSwapCoins);

export default router;

import express from "express";
import { getCoinsId, getUserCoins } from "../controllers/coinControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getUserCoins);
router.route("/coinsId").get(protect, getCoinsId);

export default router;

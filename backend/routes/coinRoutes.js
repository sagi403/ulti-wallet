import express from "express";
import { getUserCoins } from "../controllers/coinControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getUserCoins);

export default router;

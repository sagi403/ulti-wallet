import express from "express";
import { getCmcCoins } from "../controllers/cmcController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getCmcCoins);

export default router;

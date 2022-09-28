import express from "express";
import { getUserAddress } from "../controllers/addressControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getUserAddress);
// router.route("/coins").get(getAddressCoins);

export default router;

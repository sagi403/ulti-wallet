import express from "express";
import {
  getUserAddresses,
  getAddressCoins,
} from "../controllers/addressControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getUserAddresses);
router.route("/coins").get(protect, getAddressCoins);

export default router;

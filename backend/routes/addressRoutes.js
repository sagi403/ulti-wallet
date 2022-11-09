import express from "express";
import {
  getUserAddresses,
  getAddressCoins,
  createUserAddress,
} from "../controllers/addressControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, getUserAddresses)
  .post(protect, createUserAddress);
router.route("/coins").get(protect, getAddressCoins);

export default router;

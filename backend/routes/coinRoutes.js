import express from "express";
import {
  getCoinsBasicInfo,
  getCoinsId,
  getCoinsInfo,
} from "../controllers/coinControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getCoinsInfo);
router.route("/basic").get(protect, getCoinsBasicInfo);
router.route("/coinsId").get(protect, getCoinsId);

export default router;

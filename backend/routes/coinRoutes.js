import express from "express";
import {
  getAllCoinsBasicInfo,
  getAllCoinsId,
  getCoinsBasicInfo,
  getCoinsId,
  getCoinsInfo,
} from "../controllers/coinControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getCoinsInfo);
router.route("/basic").get(protect, getCoinsBasicInfo);
router.route("/basicAll").get(protect, getAllCoinsBasicInfo);
router.route("/coinsId").get(protect, getCoinsId);
router.route("/coinsIdAll").get(protect, getAllCoinsId);

export default router;

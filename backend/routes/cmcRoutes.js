import express from "express";
import { getCmcCoins } from "../controllers/cmcController.js";
import { protect } from "../middleware/authMiddleware.js";
import validateInputs from "../middleware/validateInputs.js";
import { getCmcCoinsValidation } from "../validation/cmcValidation.js";

const router = express.Router();

router.post("/", getCmcCoinsValidation, validateInputs, protect, getCmcCoins);

export default router;

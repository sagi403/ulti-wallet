import express from "express";
import {
  getUserAddresses,
  getAddressCoins,
  createUserAddress,
} from "../controllers/addressControllers.js";
import { protect } from "../middleware/authMiddleware.js";
import validateInputs from "../middleware/validateInputs.js";
import {
  createUserAddressValidation,
  getAddressCoinsValidation,
} from "../validation/addressValidation.js";

const router = express.Router();

router
  .route("/")
  .get(protect, getUserAddresses)
  .post(
    createUserAddressValidation,
    validateInputs,
    protect,
    createUserAddress
  );
router.get(
  "/coins",
  getAddressCoinsValidation,
  validateInputs,
  protect,
  getAddressCoins
);

export default router;

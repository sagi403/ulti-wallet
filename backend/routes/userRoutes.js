import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  authUserValidation,
  registerUserValidation,
  updateUserProfileValidation,
} from "../validation/userValidation.js";
import validateInputs from "../middleware/validateInputs.js";

const router = express.Router();

router.post("/register", registerUserValidation, validateInputs, registerUser);
router.post("/login", authUserValidation, validateInputs, authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(updateUserProfileValidation, validateInputs, protect, updateUserProfile);

export default router;

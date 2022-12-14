import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
} from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  authUserValidation,
  registerUserValidation,
} from "../validation/userValidation.js";
import validateInputs from "../middleware/validateInputs.js";

const router = express.Router();

router.route("/").post(registerUserValidation, validateInputs, registerUser);
router.post("/login", authUserValidation, validateInputs, authUser);
router.route("/profile").get(protect, getUserProfile);

export default router;

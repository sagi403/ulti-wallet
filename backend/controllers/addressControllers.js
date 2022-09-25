import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Address from "../models/addressModel.js";

// @desc    Get user addresses
// @route   GET /api/address
// @access  Private
const getUserAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const userAddresses = await Address.find({ user });

  if (userAddresses) {
    res.json(userAddresses);
  } else {
    res.status(404);
    throw new Error("Address not found for this user");
  }
});

export { getUserAddress };

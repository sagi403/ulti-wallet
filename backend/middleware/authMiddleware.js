import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import pool from "../db/index.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // req.user = await User.findById(decoded.id).select("-password");

      const user = await pool.query(
        "SELECT user_id, name, email, is_admin FROM users WHERE user_id = $1 LIMIT 1",
        [decoded.id]
      );
      [req.user] = user.rows;

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };

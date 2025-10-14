import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
const router = express.Router();

// =====================
// Middleware to verify JWT
// =====================
const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Bearer <token>
  if (!token) {
    return res.status(401).json({ success: false, error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "defaultSecret"
    );
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: "Invalid token" });
  }
};

// =====================
// Signup Route
// =====================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// =====================
// Login Route
// =====================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "defaultSecret",
      {
        expiresIn: "1d",
      }
    );

    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// =====================
// Get Current User (Protected)
// =====================
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user)
      return res.status(404).json({ success: false, error: "User not found" });

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

export default router;

import express from "express";
import cors from "cors";

import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import mongoose from "mongoose";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: [
      "https://waqas-mern-auth-frontend-seven-indol.vercel.app",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// Routes
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/test-db", (req, res) => {
  const state = mongoose.connection.readyState;
  const states = ["disconnected", "connected", "connecting", "disconnecting"];
  res.json({ dbState: states[state] });
});

app.get("/check-env", (req, res) => {
  res.json({
    MONGO_URI: process.env.MONGO_URI ? "✅ Exists" : "❌ Missing",
  });
});

export default app;

import express from "express";
import cors from "cors";

import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000", // for local frontend
      "https://your-frontend.vercel.app", // for deployed frontend
    ],
    credentials: true,
  })
);
// Routes
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;

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

export default app;

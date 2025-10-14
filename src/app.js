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
    origin: "https://mern-auth-frontend-nu-taupe.vercel.app", // your frontend domain
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

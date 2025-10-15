import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./configuration/dbconfig.js";

// Load environment variables from .env
dotenv.config();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}

export default app;

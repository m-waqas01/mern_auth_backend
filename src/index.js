import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./configuration/dbconfig.js";

// Load environment variables from .env
dotenv.config();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server is running on : ${PORT}`);
});

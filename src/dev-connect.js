import { connectDB } from "./db.js";

connectDB()
  .then(() => {
    console.log(" MongoDB connection test successful!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

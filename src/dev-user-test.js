import { connectDB } from "./db.js";
import User from "./models/user.js";

(async () => {
  try {
    await connectDB();

    // 1) Create a user
    const created = await User.create({
      name: "Alice",
      job: "Engineer",
    });
    console.log("Created:", created.toObject());

    // 2) Read all users
    const all = await User.find({});
    console.log("All users:", all.map(d => d.toObject()));

    process.exit(0);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
})();

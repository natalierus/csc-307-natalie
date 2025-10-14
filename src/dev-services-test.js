import { connectDB } from "./db.js";
import {
  createUser,
  getAllUsers,
  getUsersByName,
  updateUserById,
} from "./services/user-services.js";

(async () => {
  try {
    await connectDB();

    const created = await createUser({ name: "Bob", job: "Designer" });
    console.log("Created:", created.toObject());

    const all = await getAllUsers();
    console.log("All users count:", all.length);

    const byName = await getUsersByName("Bob");
    console.log("Found by name:", byName.map(d => d.toObject()));

    const updated = await updateUserById(created._id, { job: "Senior Designer" });
    console.log("Updated:", updated.toObject());

    process.exit(0);
  } catch (e) {
    console.error("Error:", e.message);
    process.exit(1);
  }
})();

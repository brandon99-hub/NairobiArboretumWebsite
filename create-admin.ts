import { db } from "./server/db";
import { users } from "./shared/schema";
import bcrypt from "bcryptjs";

async function createAdminUser() {
  try {
    // Check if the user already exists
    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.username, "aboretum")
    });

    if (existingUser) {
      console.log("Admin user 'aboretum' already exists.");
      process.exit(0);
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("temporary_password", salt);

    // Create the admin user
    const [newUser] = await db
      .insert(users)
      .values({
        username: "aboretum",
        password: hashedPassword,
        email: "admin@nairobi-arboretum.com",
        isAdmin: true
      })
      .returning();

    console.log(`Admin user created successfully with ID: ${newUser.id}`);
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
}

createAdminUser();
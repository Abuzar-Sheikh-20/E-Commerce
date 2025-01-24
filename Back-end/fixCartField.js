import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load .env file

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected.");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};

// Schema for userModel
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cartData: { type: Object, default: {} },
});

const userModel = mongoose.model("user", userSchema);

const fixCartField = async () => {
  try {
    const users = await userModel.find(); // Get all users

    for (const user of users) {
      if (user.cardData) {
        // If cardData exists, move it to cartData
        user.cartData = user.cardData;
        delete user.cardData;
        await user.save();
        console.log(`Updated user: ${user.email}`);
      }
    }

    console.log("Field update complete.");
    process.exit(0); // Exit the process
  } catch (error) {
    console.error("Error updating field:", error.message);
    process.exit(1); // Exit with failure
  }
};

// Main function
const main = async () => {
  await connectDB();
  await fixCartField();
};

main();

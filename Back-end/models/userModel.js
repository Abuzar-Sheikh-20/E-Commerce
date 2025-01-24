import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
  },
  { minimize: false } // be default MongoDB minimizes the empty objects and do not store them, that's why, here i did it falsy means it'd be store empty objects also.
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
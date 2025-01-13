import { v2 as cloudinary } from "cloudinary"; // v2 is version while cloudinary (changeable) is a name.

const connectCloudinary = async () => {
  cloudinary.config({
    // cloudinary.config() is used to set up the connection and identity (to identify, which account you're using).
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
  });
};

export default connectCloudinary;

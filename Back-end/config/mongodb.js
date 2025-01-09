import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    // connected - is used to print in console when DB is succesfully connected.
    // connected (when connected), error(if error in conn), disconnected (when conn drops), reconnected (when connected again) and close (if conn closed) are the predefined keywords in mongodb. We use them to check how our DB is behaving.
    console.log("DB Connected !");
  });

  await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`); // to call mongoDB using cluster's URL stored in MONGODB_URI.
};

export default connectDB;

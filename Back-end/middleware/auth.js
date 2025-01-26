// // Using this middleware, It converts token into userID

import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // extract token from 'Bearer token'

  if (!token) {
    return res.json({ success: false, message: "Not authorized, Login again" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY); // JWT_SECRET_KEY should be defined in your .env
    req.body.userId = token_decode.id; // decode token to get user ID
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;

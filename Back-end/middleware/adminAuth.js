import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    // Get token from headers
    const { token } = req.headers;

    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized, Try again!",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Check if the decoded token contains valid admin information
    if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({
        success: false,
        message: "Not Authorized, Try again!",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default adminAuth;

// // Using this middleware, It converts token into userID

// import jwt from "jsonwebtoken";

// const authUser = async (req, res, next) => {
//   const token = req.headers;
//   if (!token) {
//     return res.json({ success: false, message: "Not authorized, Login again" });
//   }

//   try {
//     const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     req.body.userId = token_decode.id;
//     next();
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// export default authUser

import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  // Correctly access the token from the headers (Authorization header is typical)
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.json({ success: false, message: "Not authorized, Login again" });
  }

  const token = authHeader.split(" ")[1]; // Extract the actual token from the "Bearer tokenString"

  try {
    // Verify the token
    const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Attach userId to the request body
    req.body.userId = token_decode.id;

    // Proceed to the next middleware
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;

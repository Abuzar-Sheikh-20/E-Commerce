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
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.json({ success: false, message: "Not authorized, Login again" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;

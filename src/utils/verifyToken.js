import jwt from "jsonwebtoken";

const SECRETKEY = process.env.JWT_SECRET;
const verifyToken = (token) => {

  try {
    const decoded = jwt.verify(token, SECRETKEY);
    // console.log({decoded})
    return decoded;
 
  } catch (error) {
    return { message: "Invalid or expired token" }
  }
};

export default verifyToken;

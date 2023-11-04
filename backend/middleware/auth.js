const catchasyncerror = require("./catchasyncerror");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
exports.isAuthenticatedUser = catchasyncerror(async (req, res, next) => {
  let token;
  // Check for token present in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Extract token from authorization header
    token = req.headers.authorization.split(" ")[1];
  }
  else if (req.cookies.token) {
    // Extract token from cookies
    token = req.cookies.token;
  }
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please login to access this resources"
    })
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);       // we have used user id for create token with secret key before
  next();
})


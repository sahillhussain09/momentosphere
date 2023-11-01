const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.isAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization');

    // console.log(token);

    if (!token) {
      res.status(404).json({
        success: false,
        message: "please login first.",
      });
    } else {
      // console.log( "token", token);
      const decodeToken = await jwt.verify(token.split(" ")[1], process.env.JWT_SECRETE_key);
      req.user = await User.findById(decodeToken._id);
      next();
      //   const tokenDecode = await jwt.verify(token, "eyJhbGciOiJIUzI1NiJ9");
      //   req.user = await User.findById(tokenDecode._id);
      //   next();
    }
  } catch (error) {
    // console.log("Auth ERROR", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

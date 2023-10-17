const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;
const Post = require("../models/post");
require("dotenv").configDotenv()
const OTP_Generetor = require("otp-generator");



const userSchema = new Schema({
  ObjectId: String,
  username: {
    type: String,
    min: 3,
    required: [true, "username must require"],
  },

  email: {
    required: [true, "email  must require"],
    type: String,
  },


  password: {
    required: [true, "password must require"],
    type: String,
    min: 5,
  },

  profile: {
    public_id: String,
    url: String
  },

  name: {
    type: String,
  },

  bio: {
    type: String,
    max: 150,
  },

  link: {
    type: String
  },

  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
    },
  ],

  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users", // Change from "Users" to "User"
    },
  ],

  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users", // Change from "Users" to "User"
    },
  ],

  join: {
    type: Date,
    default: Date.now
  },

  resetPasswordOtp: String,
  resetPasswordTokenExpire: Date,
});

userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRETE_key);
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateOtp = async function saveOTP(OTP) {
  const sequreOtp = await bcrypt.hash(OTP, 10)
  return this.resetPasswordOtp = sequreOtp
}

const User = mongoose.model("Users", userSchema); // Change model name to "User"
module.exports = User;

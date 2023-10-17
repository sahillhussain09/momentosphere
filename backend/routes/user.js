const { signup, signin, logout, userFollow, removeFollowers, changePassword, getMyProfile, updatePassword, forgatePassword, getMyPost, getUserProfile, getUserList, getUserPosts, getUserSinglePost, resetPassword, updateMyProfile, deleteMyAccount, suggetions } = require("../controllers/user");
const user = require("../models/user");
const express = require("express");
const router = express.Router();
const { isAuth } = require("../middelwares/auth");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/logout", logout);
router.get("/myprofile", isAuth, getMyProfile);
router.put("/update/myprofile", isAuth, updateMyProfile);
router.delete('/delete/myaccount', isAuth, deleteMyAccount)
router.get("/suggestions", isAuth, suggetions);
router.get("/myposts", isAuth, getMyPost)
router.get("/user/search", isAuth, getUserList)
router.get("/user/profile/:id", isAuth, getUserProfile)
router.get("/user/post/:id", isAuth, getUserSinglePost)
router.post("/update/password", isAuth, updatePassword)
router.post("/forgate/password", forgatePassword)
router.post("/reset/password", resetPassword);
router.post("/user/follow/:id", isAuth, userFollow)
router.delete("/remove/follower/:id", isAuth, removeFollowers);
exports.router = router;

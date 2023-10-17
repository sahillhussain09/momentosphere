const express = require("express");
const {
  createPost,
  deletePost,
  postLikeAndUnlike,
  getPostOfFollowings,
  updateCaption,
  commentOnPOst,
  commentEdit,
  deleteComment,
} = require("../controllers/post");
const router = express.Router();
const { isAuth } = require("../middelwares/auth");

router
  .post("/post/upload", isAuth, createPost)
  .get("/posts", isAuth, getPostOfFollowings)
  .get("/post/likeandunlike/:id", isAuth, postLikeAndUnlike)
  .put("/post/update/:id", isAuth, updateCaption)
  .delete("/post/delete/:id", isAuth, deletePost)
  .post("/post/comment/:id", isAuth, commentOnPOst)
  .put("/comment/edit/:id", isAuth, commentEdit)
  .delete("/comment/delete/:id", isAuth, deleteComment);

exports.router = router;

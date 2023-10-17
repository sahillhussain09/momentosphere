const { request } = require("express");
const { isAuth } = require("../middelwares/auth");
const Post = require("../models/post");
const User = require("../models/user");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECREATE_KEY
})

// post type form data
exports.createPost = async (req, res) => {
  try {


    const post_image = await cloudinary.uploader.upload(req.body.image, {
      folder: "posts_images"
    }, (err, result) => err && console.log(err));

    const postData = {
      caption: req.body.caption,
      owner: req.user._id,
      image: {
        public_id: post_image.public_id,
        path: post_image.secure_url
      }
    };

    // console.log(postData.owner);

    const post = await Post.create(postData);
    const user = await User.findById(req.user._id);

    console.log(post);

    user.posts.unshift(post._id);
    await user.save();

    res.status(201).json({
      success: true,
      message: "post created!!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "post not found"
      })
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      res.status(401).json({
        success: false,
        message: "unauthorized",
      });
    } else {
      const user = await User.findById(req.user._id);
      const postIndex = user.posts.indexOf(req.params.id);
      user.posts.splice(postIndex, 1);
      await cloudinary.uploader.destroy(post.image.public_id, (err, res) => err ? console.log(err) : "image deleted in cloud")

      await user.save();
      res.status(200).json({
        success: true,
        message: "post deleted!!",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.postLikeAndUnlike = async (req, res) => {
  try {
    let postId = req.params.id;
    const post = await Post.findById(postId);

    if (post.likes.includes(req.user._id)) {
      const postIndex = post.likes.indexOf(postId);
      post.likes.splice(postIndex, 1);
      await post.save();

      res.status(200).json({
        success: true,
        message: "post unliked",
      });
    } else {
      post.likes.push(req.user._id);
      await post.save();
      res.status(201).json({
        success: true,
        message: "post liked",
      });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getPostOfFollowings = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const post = await Post.find({
      owner: {
        $in: user.following,
      },
    }).populate("owner likes comments.user");

    res.status(200).json({
      success: true,
      posts: post.reverse(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateCaption = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      res.status(404).json({
        success: false,
        message: "post not found",
      });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      res.status(401).json({
        success: false,
        message: "unauthorized",
      });
    }

    post.caption = req.body.caption;
    await post.save();
    res.status(201).json({
      success: true,
      message: "post updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.commentOnPOst = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({
        success: false,
        message: false,
      });
    } else {
      post.comments.push({
        user: req.user._id,
        comment: req.body.comment,
      });

      await post.save();
      res.status(201).json({
        success: true,
        message: "comment posted",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.commentEdit = async (req, res) => {
  try {
    // creating req intance
    const postId = req.params.id;
    const { id, comment } = req.body;
    const post = await Post.findById(postId);

    // finding index if comment exits for ternory response
    const userComment = post.comments.findIndex(
      (comment) =>
        comment._id.toString() === id &&
        comment.user.toString() === req.user._id.toString()
    );

    // checking if post User exists
    if (post) {
      post.comments.filter((item) => {
        if (
          item._id.toString() === id &&
          item.user.toString() === req.user._id.toString()
        ) {
          return (item.comment = comment);
        }
      });

      await post.save();
      res.status(userComment !== -1 ? 200 : 404).json({
        success: userComment !== -1 ? true : false,
        message:
          userComment !== -1
            ? `${req.user.username} your comment has been edited`
            : `${req.user.username} it's not your comment`,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "post not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    // creating intance of user and comment info
    const postId = req.params.id;
    const commentId = req.body.id;
    const userId = req.user._id;

    // here finding post by params
    const post = await Post.findById(postId);

    // here finding comment index by comment id from body
    const commentIndex = post.comments.findIndex(
      (item) => item._id.toString() === commentId
    );

    // console.log(commentIndex);

    if (!post) {
      res.status(404).json({
        success: false,
        message: "post not found",
      });
    }

    // if post owner want to delete comments
    if (post.owner.toString() === userId.toString()) {
      post.comments.splice(commentIndex, 1);
      await post.save();
      res.status(200).json({
        success: true,
        message: "comment deleted by post owner",
      });
    } else {
      // finding user comment
      const userComment = post.comments.filter(
        (item) =>
          item.user.toString() === userId.toString() &&
          item._id.toString() === commentId
      );

      // checking if user have own comment
      console.log(userComment);
      if (userComment.length > 0) {
        post.comments.splice(commentIndex, 1);
        await post.save();
        res.status(200).json({
          success: true,
          message: `${req.user.username} your comment has been deleted`,
        });
      } else {
        res.status(404).json({
          success: false,
          message: `${req.user.username} your can't deleted others comments`,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const User = require("../models/user");
const bycript = require("bcryptjs");
const Post = require("../models/post");
const nodemailer = require("nodemailer");
const OTP_Generetor = require("otp-generator");
const { sendEmail } = require("../middelwares/sendmail");
const { urlencoded } = require("express");
const post = require("../models/post");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECREATE_KEY
})

// user register controller
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ username: username });

    if (user) {

      return res.status(404).json({
        success: false,
        message: `${username}, This name allredy taken by someone.`
      })

    } else {
      const hashPass = await bycript.hash(password, 10);

      const newUser = new User(req.body);
      newUser.password = hashPass;
      await newUser.save();
      const token = await newUser.generateToken();
      const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      return res
        .status(201)
        .cookie("token", token, options)
        .json({
          success: true,
          message: `${username} successfully registered.`,
          token,
        });
    }
  } catch (error) {
    console.error("Error saving user:", error);
    return res.status(500).json({
      success: false,
      message: "Error saving user",
      error: error.message,
    });
  }
};

// user login controller
exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username })
      .select(" +password")
      .populate("followers following");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `${username} not found!!`,
      });
    }

    const isMatched = await user.comparePassword(password);

    if (!isMatched) {
      return res.status(401).json({
        success: false,
        message: `${username} your password doesn't match!!`,
      });
    } else {
      const token = await user.generateToken();

      const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      return res
        .status(200)
        .cookie("token", token, options)
        .json({
          success: true,
          message: `${username} login successfully`,
          token,
          user,
        });
    }
  } catch (error) {
    console.error(error.message); // Corrected 'error.massage' to 'error.message'
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get loggedUser profile / myprofie
exports.getMyProfile = async (req, res) => {
  try {
    const loggedUser = await User.findOne({ _id: req.user._id }).populate(
      "posts followers following"
    );

    res.status(200).json({
      success: true,
      user: loggedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// get my profile for profilepage
exports.getMyPost = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      const posts = await Post.find({ owner: req.user._id }).populate("owner likes comments.user");
      res.status(200).json({
        success: true,
        response: user.posts.length > 0 ? posts : user
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'user not found'
      })
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


// this controller compleated but changing the path of profile from req.files to body is pending

exports.updateMyProfile = async (req, res) => {

  try {

    const { name, bio, url } = req.body;

    const profile = req.files.profile;

    const loggedUser = await User.findById(req.user._id);
    // console.log(loggedUser);

    if (!loggedUser) {
      return res.status(404).json({
        success: false,
        message: "user not found"
      })
    }

    if (profile) {
      loggedUser.profile.public_id && await cloudinary.uploader.destroy(loggedUser.profile.public_id, (err, result) => {
        err ? console.log("cloudinary destroyer ERROR", err) : "";
      });

      const avatar = await cloudinary.uploader.upload(profile.tempFilePath, {
        folder: "user_profiles"
      }, (err, result) => err ? console.log("clooudinary uploder ERROR", err) : "");

      loggedUser.profile.public_id = avatar.public_id;
      loggedUser.profile.url = avatar.secure_url
    }

    if (name) {
      loggedUser.name = name
    }

    if (bio) {
      loggedUser.bio = bio
    }

    if (url) {
      loggedUser.link = url
    }

    await loggedUser.save();
    console.log(loggedUser);
    return res.status(201).json({
      success: true,
      message: "profile has been updated."
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }

}

// get users by search
exports.getUserList = async (req, res) => {
  try {

    const allUsers = await User.find({
      username: {
        $regex: req.query.username, $options: "i"
      }
    })

    res.status(200).json({
      success: true,
      allUsers
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("posts followers following")

    if (user) {
      res.status(200).json({
        success: true,
        user
      })
    } else {
      res.status(404).json({
        success: false,
        message: "user not found."
      })
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// get user to visiting profile
exports.getUserSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("owner likes comments.user");

    res.status(200).json({
      success: true,
      response: post
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}



// user update password controller
exports.updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const loggedUser = await User.findById(req.user._id).select("+password");
    let newPassMatch = true;

    if (!oldPassword || !newPassword || !confirmPassword) {
      res.status(404).json({
        message: "please fill all inputs",
      });
    } else {
      const passwordMatched = await loggedUser.comparePassword(oldPassword);

      if (!passwordMatched) {
        res.status(404).json({
          success: false,
          message: `${req.user.username} your old password dose'nt match.`,
        });
      } else {
        const hashPass =
          newPassword === confirmPassword &&
          (await bycript.hash(confirmPassword, 10));

        hashPass ? (loggedUser.password = hashPass) : (newPassMatch = false);


        await loggedUser.save();
        res.status(newPassMatch ? 201 : 404).json({
          success: newPassMatch ? true : false,
          message: newPassMatch
            ? `${req.user.username} your password has been updated`
            : `${req.user.username} new and old password dose'nt match.`,
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

// user forgate request password controller
exports.forgatePassword = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username: username });

    if (user) {

      const OTP = OTP_Generetor.generate(4, { digits: true, upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
      await user.generateOtp(OTP);

      const mail = user.email;
      const mailMsg = `<h3> Hello ${user.username}, your momentosphere reset password OTP is ${OTP}. please do not share to anybody. </h3>`;

      await sendEmail(mail, mailMsg)
      // console.log(OTP);

      user.resetPasswordTokenExpire = new Date(new Date().getTime() + 10 * 60 * 1000);
      await user.save();
      res.status(201).json({
        success: true,
        message: "Otp send on your email, It's has been expire in 10 minutes."
      })
    } else {
      res.status(404).json({
        success: false,
        message: "user not found."
      })
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.resetPassword = async (req, res) => {
  try {
    const { username, otp, newpassword } = req.body;

    const user = await User.findOne({ username: username });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found."
      })
    }

    // if user exist 
    if (user) {

      // compare saved otp and user provide otp
      const OTP_Compare = await bycript.compare(otp, user.resetPasswordOtp);

      if (OTP_Compare) {

        const currentTime = new Date(new Date().getTime());

        // if otp is right than check otp expired or not
        if (currentTime <= user.resetPasswordTokenExpire) {
          const hassedPassword = await bycript.hash(newpassword, 10);
          user.password = hassedPassword;
          user.resetPasswordOtp = undefined;
          user.resetPasswordTokenExpire = undefined;
          await user.save();
          return res.status(201).json({
            success: true,
            message: `Congrates ${user.username}, your password has been reset. Now you have access to login!!`
          })
        } else {
          // if otp was expired than remove otp and generated time in database
          user.resetPasswordOtp = undefined;
          user.resetPasswordTokenExpire = undefined;
          await user.save();
          return res.status(404).json({
            success: false,
            message: "OTP has expired. Please generate a new OTP."
          })
        }

      } else {
        return res.status(404).json({
          success: false,
          message: "Oops! Wrong OTP"
        })
      }
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


// user follow and unfollow controller
exports.userFollow = async (req, res) => {
  try {
    // here we are finding user have login and user to follow to are existing
    const userToFollow = await User.findById(req.params.id);
    const loggedUser = await User.findById(req.user._id);

    if (!userToFollow) {
      res.status(404).json({
        success: false,
        message: "user dose'nt exist",
      });
    } else {
      // here if user alreday exist in following list than unfollowed him
      if (loggedUser.following.includes(req.params.id)) {
        const folloingIndex = loggedUser.followers.indexOf(loggedUser._id);
        const followersIndex = userToFollow.followers.indexOf(loggedUser._id);

        userToFollow.followers.splice(followersIndex, 1);
        loggedUser.following.splice(folloingIndex, 1);

        await userToFollow.save();
        await loggedUser.save();

        res.status(200).json({
          success: true,
          message: `${userToFollow.username} unfollowed successfully.`,
        });
      } else {
        // if user not exist in following list than follow him
        userToFollow.followers.push(loggedUser._id);
        loggedUser.following.push(userToFollow._id);

        await userToFollow.save();
        await loggedUser.save();

        res.status(201).json({
          success: true,
          message: `${userToFollow.username} followed succesfully.`,
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

// foller remove controller
exports.removeFollowers = async (req, res) => {
  // oposite logic of usrtofollow controller

  try {
    const userToUnfollow = await User.findById(req.params.id);
    const loggedUser = await User.findById(req.user._id);

    if (loggedUser.followers.includes(req.params.id)) {
      const loggedUserFollowersIndex = loggedUser.followers.indexOf(
        req.params.id
      );
      const userToUnfollow_FollowingIndex = userToUnfollow.following.indexOf(
        req.user._id
      );

      loggedUser.followers.splice(loggedUserFollowersIndex, 1);
      userToUnfollow.following.splice(userToUnfollow_FollowingIndex, 1);

      await loggedUser.save();
      await userToUnfollow.save();

      res.status(200).json({
        success: true,
        message: `${userToUnfollow.username} removed succefully.`,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `${userToUnfollow.username} its dose'nt exist in your followers list.`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//  delete profile still pending prnding...
exports.deleteMyAccount = async (req, res) => {

  try {

    // creating user intances
    const userId = req.user._id
    const loggedUser = await User.findById(req.user._id);
    const posts = await Post.find({ owner: req.user._id }).populate("image");


    if (loggedUser) {

      // profile picture removing from cloudinary user_prodile folder
      loggedUser.profile.public_id && await cloudinary.uploader.destroy(loggedUser.profile.public_id, (err, result) => err ? console.log("Cloud profile destroyer ERROR", err) : console.log("Cloud profile deleted!!"))

      // post images remove from cloudinary posts_images folder
      posts && posts.forEach(async (elem) => {
        await cloudinary.uploader.destroy(elem.image.public_id, (err, result) => {
          err ? console.log(err) : console.log(result);
        })
      })

      // Step 1: Find and delete user's posts
      await Post.deleteMany({ owner: userId });

      // Step 2: Remove references to user in other users' "likes" and "comments"
      await Post.updateMany(
        { 'likes': userId },
        { $pull: { 'likes': userId } }
      );

      // Step 3: Remove comments made by the user in other users' posts
      await Post.updateMany(
        { 'comments.user': userId },
        { $pull: { 'comments': { 'user': userId } } }
      );

      // Step 5: Finally, delete the user account
      await User.findByIdAndRemove(userId);

      console.log('User account deleted successfully.');


    } else {
      res.status(404).json({
        success: false,
        message: "user not found."
      })
    }

  } catch (error) {
    console.log("status code 500 : ", error);
    return res.status(500).json({
      success: false,
      message: "user not found."
    })
  }

}


exports.suggetions = async (req, res) => {
  try {

    const users = await User.find();
    console.log(users);

    if (users) {
      return res.status(200).json({
        success: true,
        message: "users found"
      })
    } else {
      return res.status(404).json({
        success: false,
        message: "user not found"
      })
    }


  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// user logout controller
exports.logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "logged out successfully",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// registartion otp conframation pending...


// updateProfile pending...

deleteMyProfile

try {
    const userEmail = req.body.email;
    const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: "your momentosphere password reset OTP",
        html: `<h3> congratulations, ssimran mansuri your reset OTP is 8668. Do not shere with anybody </h3>`
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log("error", err);
            res.status(404).json({
                success: false,
                message: "Oops!! something went wrong."
            })
        } else {
            console.log("info", info.response);
            res.status(201).json({
                success: true,
                message: `reset otp succefully send on this email. Please check emailbox ${userEmail}`
            })
        }
    });





    if (user) {
        // console.log(user.resetPasswordTokenExpire.toLocaleTimeString());
        const currentTime = new Date(new Date().getTime());
        // console.log(currentTime.toLocaleTimeString());

        // checking first otp time valid or note
        if (currentTime < user.resetPasswordTokenExpire) {

            const otp_campare = await bycript.compare(otp, user.resetPasswordOtp);

            // check otp right or wrong
            if (otp_campare) {
                const hassPassword = await bycript.hash(newpassword, 10);
                user.password = hassPassword;
                user.resetPasswordOtp = undefined;
                user.resetPasswordTokenExpire = undefined;
                await user.save();
                res.status(201).json({
                    success: true,
                    message: `${user.username} your password has been reset.`
                })
                console.log(newpassword);
            } else {
                res.status(404).json({
                    success: false,
                    message: "Oops! wrong otp"
                })
            }
        } else {
            // if otp token time have expire than remove resetPasswordOtp and resetPasswordTokenExpire 
            user.resetPasswordOtp = undefined;
            user.resetPasswordTokenExpire = undefined;
            await user.save();
            res.status(404).json({
                success: false,
                message: "otp has expired. Please generate new Otp"
            })
        }
    } else {
        res.status(404).json({
            success: false,
            message: "user not found."
        })
    }














    exports.deleteMyProfile = async (req, res) => {
        try {
            const user = await User.findById(req.user._id);
            const posts = user.posts;
            const followers = user.followers;
            const following = user.following;
            const userId = user._id;

            // Removing Avatar from cloudinary
            await cloudinary.v2.uploader.destroy(user.avatar.public_id);

            await user.remove();

            // Logout user after deleting profile

            res.cookie("token", null, {
                expires: new Date(Date.now()),
                httpOnly: true,
            });

            // Delete all posts of the user
            for (let i = 0; i < posts.length; i++) {
                const post = await Post.findById(posts[i]);
                await cloudinary.v2.uploader.destroy(post.image.public_id);
                await post.remove();
            }

            // Removing User from Followers Following
            for (let i = 0; i < followers.length; i++) {
                const follower = await User.findById(followers[i]);

                const index = follower.following.indexOf(userId);
                follower.following.splice(index, 1);
                await follower.save();
            }

            // Removing User from Following's Followers
            for (let i = 0; i < following.length; i++) {
                const follows = await User.findById(following[i]);

                const index = follows.followers.indexOf(userId);
                follows.followers.splice(index, 1);
                await follows.save();
            }

            // removing all comments of the user from all posts
            const allPosts = await Post.find();

            for (let i = 0; i < allPosts.length; i++) {
                const post = await Post.findById(allPosts[i]._id);

                for (let j = 0; j < post.comments.length; j++) {
                    if (post.comments[j].user === userId) {
                        post.comments.splice(j, 1);
                    }
                }
                await post.save();
            }
            // removing all likes of the user from all posts

            for (let i = 0; i < allPosts.length; i++) {
                const post = await Post.findById(allPosts[i]._id);

                for (let j = 0; j < post.likes.length; j++) {
                    if (post.likes[j] === userId) {
                        post.likes.splice(j, 1);
                    }
                }
                await post.save();
            }

            res.status(200).json({
                success: true,
                message: "Profile Deleted",
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };
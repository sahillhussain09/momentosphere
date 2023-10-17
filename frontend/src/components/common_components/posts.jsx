import React, { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { LiaTelegramPlane } from "react-icons/lia";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import Comments from "../common_components/Comments"
import { Link } from "react-router-dom"
import { postLikeAndUnlike } from "../../redux/actions/PostActions"
import { postLikeAndUnlikeReducer } from "../../redux/reducers/PostReducers";
import { useDispatch, useSelector } from "react-redux"

function Posts({

    caption,
    comments,
    likes,
    uploadTime,
    postImg,
    owner_profile,
    username,
    postId,
    setCommentsBox,
    commentsBox,
    setPostId,
    postKey

}) {

    const [postLike, setPostLike] = useState(false);
    const [postSave, setPostSave] = useState(false);
    const [postComment, setPostComment] = useState(false);
    const likeDisptach = useDispatch();
    const [likeCount, setLikeCount] = useState(likes.length);

    const { loading, error, data } = useSelector((state) => state.likeAndUnlike)
    const { user } = useSelector((state) => state.loadMyProfile.data)

    const handleComments = () => {
        setPostId(postId)
        setCommentsBox(!commentsBox)
    }

    const handlePostLike = async (postId) => {
        likeDisptach(postLikeAndUnlike(postId))

    }

    useEffect(() => {
        if (data && data.message === "post liked") {
            setLikeCount(likeCount + 1)
        } else if (data && data.message === "post unliked") {
            setLikeCount(likeCount - 1)
        } else {
            likeCount < 0 ? setLikeCount(likes.length + 1) : false
        }

    }, [data])

    return (
        <>
            <div className="posts-cont" key={postKey}>
                <div className="postbox">
                    <div className="post-head">
                        <div className="post-userinfo-box">
                            <div className="img-gr">
                                <img src={owner_profile} />
                            </div>

                            <div className="post-info">
                                <Link onClick={() => console.log(ownerId)} to={"/profile"}>{username}</Link>
                                <span>{uploadTime}</span>
                            </div>
                        </div>
                        <div className="post-about">
                            <BsThreeDotsVertical />
                        </div>
                    </div>
                    <div className="post-img" onDoubleClick={() => handlePostLike(postId)}>
                        <img src={postImg} />
                    </div>
                    <div className="post-body">
                        <div className="main-icons">
                            <div className="left-icons">
                                <span
                                    className="post-like"
                                    onClick={() => setPostLike(!postLike)}
                                >
                                    {postLike ? <FcLike /> : <AiOutlineHeart />}
                                </span>
                                <span className="post-cmd" onClick={handleComments}>
                                    <FaRegComment />
                                </span>
                                <span>
                                    <LiaTelegramPlane className="post-share" />
                                </span>
                            </div>
                            <div className="right-icon">
                                <span onClick={() => handlePostLike(postId)}>
                                    {postSave ? (
                                        <AiOutlinePlusCircle />
                                    ) : (
                                        <AiFillPlusCircle />
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="postbody-text">
                            <div className="like-count">
                                <h5>{likeCount} likes </h5>
                            </div>
                            <p className="user-text">
                                <span className="description">{caption}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Posts;

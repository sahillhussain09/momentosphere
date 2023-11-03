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
import { postLikeAndUnlike, postEditAction } from "../../redux/actions/PostActions"
import { postLikeAndUnlikeReducer } from "../../redux/reducers/PostReducers";
import { useDispatch, useSelector } from "react-redux"
import { getMyPosts, getUserProfile } from "../../redux/actions/UserActions"
import DotMenu from "../common_components/DotMenu";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, TextField, Typography } from "@mui/material";

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
    postKey,
    ownerId,
    ownerAccount

}) {

    const [postLike, setPostLike] = useState(false);
    const [postSave, setPostSave] = useState(false);
    const [postComment, setPostComment] = useState(false);
 
    const [likeCount, setLikeCount] = useState(likes.length);
    const [menuOption, setMenuOption] = useState('');
    const [editCaption, setEditCaption] = useState(caption);

    const likeDisptach = useDispatch();
    const postEditDispatch = useDispatch();
    const loadMyPosts = useDispatch();

    const { loading, error, data } = useSelector((state) => state.likeAndUnlike)
    // const  user  = useSelector((state) => state.loadMyProfile.data.user)


    const {editPostLoading, editPostData, editPostError} = useSelector((state) => state.postEdit);
    

    //   material ui dialog box states and functions
    const [open, setOpen] = React.useState(false);


    //  dailog box close fuction
    const handleClose = () => {
        setOpen(false);
        setEditCaption(caption)
        loadMyPosts(getMyPosts());
    };


    // handle comment fuction
    const handleComments = () => {
        setPostId(postId)
        setCommentsBox(!commentsBox)
    }

    // function for calling post like and unlike action
    const handlePostLike = async (postId) => {
        likeDisptach(postLikeAndUnlike(postId))
    }
 

    const handleEditPost = () =>{
        postEditDispatch(postEditAction({postId, editCaption}));
        
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
                                <Link to={ownerId && `/user_profile/${ownerId}`}>{username}</Link>
                                <span>{uploadTime}</span>
                            </div>
                        </div>


                        {/* here components for delete and edit owner posts */}

                        <div className="post-about">
                            {
                                ownerAccount && <DotMenu postId={postId} setOpen={setOpen} setMenuOption={setMenuOption} />
                            }
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

                {
                    menuOption === "Edit" ? <div>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogContent>
                                {
                                    editPostData ? 
                                    <Box sx={{
                                        height: "200px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                          <Typography variant="h2">{ editPostData && editPostData.message}</Typography>
                                    </Box>

                                    : <div className='upload-cont'>
                                        <div className='uploader-head'>
                                            <img alt='Oops! something bad' src={postImg} />
                                        </div>

                                        <Box
                                            component="form"
                                            sx={{
                                                '& > :not(style)': { m: 1, width: '100%' },

                                            }}
                                            noValidate
                                            autoComplete="off"
                                        >
                                            <TextField id="standard-basic" label="Edit caption here..." value={editCaption} variant="standard" onChange={(e) => setEditCaption(e.target.value)} />
                                        </Box>
                                    </div>
                                }
                            </DialogContent>
                            <DialogActions>
                                <Button size='small' color='error' onClick={handleClose}>Cancel</Button>
                                <Button size='small' variant="contained" color="success" onClick={handleEditPost}>
                                    {editPostLoading ? "updating..." : "update"}
                                </Button>

                            </DialogActions>
                        </Dialog>
                    </div> : null
                }

            </div>
        </>
    );
}

export default Posts;

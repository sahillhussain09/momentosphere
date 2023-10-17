import React, { useLayoutEffect, useState } from "react";
import { FiSend } from "react-icons/fi";

function Comment({
    item
}) {

    return (
        item.map((post) => {
            return (
                <div className="comment-cont">
                    <div className="post-comment">
                        <div className="cmd-post-img">
                            <img src={post.image.path} />
                            <div className="post-decription">
                                <p>
                                    {post.caption}
                                </p>
                            </div>
                        </div>
                        <div className="cmd-box">
                            <div className="postcmd-info">
                                <img className="postcmt-profile" src={post.owner.profile ? post.owner.profile.url : null} />
                                <div className="post-time">
                                    <h3> {post.owner.username} </h3>
                                    <p>{post.created}</p>
                                </div>
                            </div>
                            <div className="cmd-body">
                                {post.comments.length > 0 ? (
                                    post.comments.map((cmt, index) => {
                                        return (
                                            <div key={index} className="cmt">
                                                <p>{cmt.comment}</p>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="nocmt">
                                        <p> nothing comments here </p>
                                    </div>
                                )}
                            </div>
                            <div className="cmt-input">
                                <input
                                    type="text"
                                    placeholder="write comment here..."

                                />
                                <button className="cmt-post-btn">
                                    <FiSend />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    );
}

export default Comment;


// {
//     commentsBox ? <Comments
//         postImg={post_image}
//         caption={caption}
//         username={owner_username}
//         profile={owner_profile}
//         uploadTime={created_time}
//         comments={comments}
//     /> : null
// }



// <div className="postbox" key={postId}>
//     <div className="post-head">
//         <div className="post-userinfo-box">
//             <div className="img-gr">
//                 <img src={owner_profile} />
//             </div>

//             <div className="post-info">
//                 <Link onClick={() => console.log(ownerId)} to={"/profile"}>{owner_username}</Link>
//                 <span>{created_time}</span>
//             </div>
//         </div>
//         <div className="post-about">
//             <BsThreeDotsVertical />
//         </div>
//     </div>
//     <div className="post-img">
//         <img src={post_image} />
//     </div>
//     <div className="post-body">
//         <div className="main-icons">
//             <div className="left-icons">
//                 <span
//                     className="post-like"
//                     onClick={() => setPostLike(!postLike)}
//                 >
//                     {postLike ? <FcLike /> : <AiOutlineHeart />}
//                 </span>
//                 <span className="post-cmd" onClick={() => setCommentsBox(!commentsBox)}>
//                     <FaRegComment />
//                 </span>
//                 <span>
//                     <LiaTelegramPlane className="post-share" />
//                 </span>
//             </div>
//             <div className="right-icon">
//                 <span onClick={() => setPostSave(!postSave)}>
//                     {postSave ? (
//                         <AiOutlinePlusCircle />
//                     ) : (
//                         <AiFillPlusCircle />
//                     )}
//                 </span>
//             </div>
//         </div>

//         <div className="postbody-text">
//             <div className="like-count">
//                 <h5>{likes.length + 1} likes</h5>
//             </div>
//             <p className="user-text">
//                 <span className="description">{caption}</span>
//             </p>
//         </div>
//     </div>
// </div>





import React, { useEffect, useState } from "react";
import "../../styles/Home.css";
import Posts from "../../components/common_components/posts";
import Story from "../../components/common_components/Story";
import { getPostOfFollowings, loadUser } from "../../redux/actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import dummyProfile from "../../assets/images/dummyuserprofile.png";
import Loading from "../../components/common_components/Loading";
import Comment from "../../components/common_components/Comments";

function HomeMid() {
    const postsDispatch = useDispatch();
    const loadMyProfile = useDispatch();
    const [commentsBox, setCommentsBox] = useState(false);
    const [postId, setPostId] = useState('');


    useEffect(() => {
        postsDispatch(getPostOfFollowings());
        loadMyProfile(loadUser())
    }, []);

    const { loading, data, error } = useSelector(
        (state) => state.postsOfFollowings
    );


    let posts = []

    data ? (posts = data.posts) : null;

    console.log("followingspost", posts);

    return (
        <div className="homemid">
            <Story />
            {
                loading && <Loading />
            }
            {
                posts && posts.length > 0 ? posts.map((post, index) => {
                    return (
                        <>
                            <Posts caption={post.caption}
                                comments={post.comments}
                                likes={post.likes}
                                uploadTime={post.created}
                                postImg={post.image.path}
                                owner_profile={post.owner.profile ? post.owner.profile.url : dummyProfile}
                                username={post.owner.username}
                                postId={post._id}
                                setCommentsBox={setCommentsBox}
                                commentsBox={commentsBox}
                                setPostId={setPostId}
                                postKey={index}
                            />
                        </>
                    )
                }) : <h1>no post here...</h1>
            }
        </div>
    );
}

export default HomeMid;

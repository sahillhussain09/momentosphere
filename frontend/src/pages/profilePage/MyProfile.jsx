import React, { useEffect } from 'react'
import Profile from '../../components/profile/Profile'
import LeftMenu from "../../components/navbars/LeftMenu"
import "../../styles/Profile.css"
import { useDispatch, useSelector } from "react-redux"
import { loadUser, getMyPosts } from "../../redux/actions/UserActions"
import ProfileLoading from '../../components/common_components/ProfileLoading'


function MyProfile() {

    const {allPostsLoading, allPostsData, allPostsError,} = useSelector((state) => state.getMyPosts)

    useEffect(() => {
        loadProfileDispatch(loadUser());
        loadMyPosts(getMyPosts())
    }, [])

    const { loading, data, error } = useSelector((state) => state.loadMyProfile);

    allPostsData &&  console.log("allPostsData", allPostsData.response);

    const loadProfileDispatch = useDispatch();
    const loadMyPosts = useDispatch();
    let user;
    data ? user = data.user : null



    // console.log(allPostsData)

    return (
        <div className='profile-container'>
            <div className='profile-sidemenu'>
                <LeftMenu />
            </div>
            <div className='profile-box'>
                {
                    loading ? <ProfileLoading /> : data && <Profile
                        username={user.username}
                        name={user.name}
                        bio={user.bio}
                        socialLinks={user.link}
                        profilePicture={user.profile.url}
                        followers={user.followers}
                        followings={user.following}
                        // ownerId={user._id}
                        ownerAccount={true}
                       posts={user.posts}
                    />
                }
            </div>
            <div className='profile-suggestions'>
                suggestions
            </div>
        </div>
    )
}



export default MyProfile
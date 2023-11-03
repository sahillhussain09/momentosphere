import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LeftMenu from '../../components/navbars/LeftMenu';
import Suggestions from '../../components/common_components/Suggestions';
import "../../styles/Profile.css"
import Profile from "../../components/profile/Profile";
import ProfileLoading from "../../components/common_components/ProfileLoading";
import { useParams } from 'react-router-dom';
import { getUserProfile, loadUser } from "../../redux/actions/UserActions"
import dummyProfileImage from "../../assets/images/dummyuserprofile.png"

function UserProfile() {

    const userProfileReloadDispatch = useDispatch();
    const loadMyProfile = useDispatch();

    let { loading, data, error } = useSelector((state) => state.getUserProfile);
    let userProfileData;

    data ? userProfileData = data.user : error = !null
    // console.log("userProfileData", userProfileData);

    let { id } = useParams();


    useEffect(() => {
        userProfileReloadDispatch(getUserProfile(id));
        loadMyProfile(loadUser())
    }, [])
    
    return (
        <div className='profile-container'>
            <div className='profile-sidemenu' >
                <LeftMenu />
            </div>
            <div className='profile-box'>
                {
                    loading ? <ProfileLoading /> : (
                        error ? <div className='profile-err'>
                            <h2>Oops! Something went wrong. please reload</h2>
                        </div> : <Profile
                            username={userProfileData.username}
                            name={userProfileData.name}
                            bio={userProfileData.bio}
                            socialLinks={userProfileData.link}
                            profilePicture={userProfileData.profile ? userProfileData.profile.url : dummyProfileImage}
                            followers={userProfileData.followers}
                            followings={userProfileData.following}
                            ownerAccount={false}
                            posts={userProfileData.posts}
                            ownerId={userProfileData._id}
                        />
                    )
                }
            </div>
            <div className='profile-suggestions'>
                <Suggestions />
            </div>
        </div>
    )
}

export default UserProfile
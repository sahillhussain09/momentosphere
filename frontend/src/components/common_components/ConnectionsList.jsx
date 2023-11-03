import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { Link, useNavigate } from 'react-router-dom';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import "../../styles/Profile.css"
import { useDispatch } from 'react-redux';
import {followUser} from "../../redux/actions/UserActions"

function ConnectionsList({
    username,
    avatar,
    name,
    userId,
    myProfileData,
    userFollowData,
    setSimpleSnackOpen,
    handleClose,
    connectionsContents
}) {

const [userFollowed, setUserFollowed] = useState(false);
const followDispatch = useDispatch();
const [userAllredyFollowed, setUserAllredyFollowed] = useState(false);


// handling user follow request 
const handleFollowUser = (userId) =>{

    if( myProfileData && userId !== myProfileData.user._id){
        console.log(userId);
        followDispatch(followUser(userId));
    }else{
        return false
    }
  }

console.log(connectionsContents);

// this useEffect handle followe or unfollow icon on redux reducer 
useEffect(() =>{

    if(userFollowData !== null){
        setSimpleSnackOpen(true);
            if(userFollowData.message === `${username} followed succesfully.`){
                setUserFollowed(true);
            }
             if(userFollowData.message === `${username} unfollowed successfully.`){
             setUserFollowed(false);
             setUserAllredyFollowed(false);
            }
    }

}, [userFollowData]);

useEffect(() =>{

   const userAllredyFollowed = connectionsContents !== null ? connectionsContents.includes(myProfileData.user._id) : false ;

   if(userAllredyFollowed){
    setUserAllredyFollowed(true);
   }

//    console.log( username + "contendLength", contendLength);    

}, [ connectionsContents, myProfileData])

  return (
    <div key={userId}>
           <div className='connectionsbox'>
                    <div>
                    <Avatar alt="Remy Sharp" src={avatar} />
                    </div>
                      
                      <div className='maininfo-box'>
                      <div className='connectionsbox-infos'>
                         <Link to={  userId !== myProfileData.user._id && `/user_profile/${userId}`} onClick={ ()=> handleClose(userId)}> {username}</Link>
                         <h3>{name}</h3>
                         </div>
                         <div>
                           <button onClick={()=> handleFollowUser(userId)} style={{border: "none",
                           outline: "none",
                           backgroundColor: "transparent",
                           cursor: "pointer"
                           }}>
                             { myProfileData && userId !== myProfileData.user._id ? userFollowed || userAllredyFollowed  ? <PersonRemoveIcon /> : <PersonAddAlt1Icon color='primary' /> : null}
                           </button>
                         </div>
                      </div>
                    </div>
    </div>
  )
}

export default ConnectionsList


// this list still work in...
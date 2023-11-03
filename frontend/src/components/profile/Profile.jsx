import React, { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Posts from "../common_components/posts";
import Button from "@mui/material/Button";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { followUser } from "../../redux/actions/UserActions";
import ProfileUpdate from "../update/ProfileUpdate";
import SimpleSnackbar from "../common_components/simpleSnackbar";
import ConnectionsList from "../common_components/ConnectionsList";
import Connections from "../connections/Connections";

function Profile({
  username,
  name,
  bio,
  socialLinks,
  profilePicture,
  followers,
  followings,
  ownerId,
  ownerAccount,
  posts,
}) {
  // console.log(posts);

  const followUserDispatch = useDispatch();
  const [value, setValue] = useState("posts");
  const [IsFollowed, setIsFollowed] = useState(false);
  const [followersCount, setFollowersCount] = useState(followers.length);

  // material states for components
  const [open, setOpen] = React.useState(false);
  const [simpleSnackOpen, setSimpleSnackOpen] = useState(false);
  const [openConnectionsList, setOpenConnectionsList] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleConnectionListOpen = () => {
    setOpenConnectionsList(true);
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  // this function Dispatch follow Request
  const handleFollowUser = () => {
    followUserDispatch(followUser(ownerId));
    setSimpleSnackOpen(true);
  };

  // redux reducer for getting data
  const followUserData = useSelector((state) => state.followUser.data);
  const myProfileData = useSelector((state) => state.loadMyProfile.data);


  // user allredy follow or not checker
   useEffect(() => {
    myProfileData !== null ? followers.filter((elem) => {
       return elem._id === myProfileData.user._id
         ? setIsFollowed(true)
         : setIsFollowed(false);
     }) : false
   }, [myProfileData]);


  // useEffect for handle followersCount and IsFollowed state 
  useEffect(() => {
    if (followUserData !== null) {
      if (followUserData.message === `${username} followed succesfully.`) {
        setIsFollowed(true);
        setFollowersCount(followersCount + 1);
      }
      if(followUserData.message === `${username} unfollowed successfully.`){
        setIsFollowed(false);
        setFollowersCount( followersCount - 1);
      }
    }
  }, [followUserData]);

  // custom styles for material componets
  const tabStyle = {
    margin: "0px 30px",
    textTransform: "lowercase",
  };

  return (
    <>
      <div className="profile-head">
        <div className="left-myprofile">
          <img src={profilePicture} alt="profile picture" />
          <span>{name}</span>
        </div>
        <div className="right-profile">
          <div className="my-info">
            <h2>{username}</h2>
            {ownerAccount ? (
              <button className="profile-editbtn" onClick={handleClickOpen}>
                <span>
                  <FaUserEdit />
                </span>
                Edit Profile
              </button>
            ) : (
              <div>
                <Button
                  onClick={handleFollowUser}
                  variant= { IsFollowed ? "outlined" : "contained"}
                  size="small"
                >
                  {IsFollowed ? "Followed" : "Follow"}
                </Button>{" "}
                <IconButton color="secondary" aria-label="add an alarm">
                  <TextsmsOutlinedIcon />
                </IconButton>
              </div>
            )}
          </div>
          <div className="connections-info">
            <div className="info-btns">
              <button className="followers-btn">
                <span>Posts</span>
                <span>{posts ? posts.length : 0}</span>
              </button>
              <button className="followers-btn">
                <span>Followers</span>
                <span>{followersCount}</span>
              </button>
              <button onClick={handleConnectionListOpen} className="followings-btn">
                <span>Followings</span>
                <span>{followings.length}</span>
              </button>
            </div>
          </div>
          <div className="prfile-mid">
            <p>{bio}</p>
            <a href={socialLinks}>{socialLinks}</a>
          </div>
        </div>
      </div>

      <div className="profile-bottom">
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            marginTop: "-20px",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab value="posts" label="Posts" sx={tabStyle} />
            <Tab value="thougts" label="Thougts" sx={tabStyle} />
            {ownerAccount && <Tab value="saved" label="Saved" sx={tabStyle} />}
          </Tabs>
        </Box>

        <div className="profile-posts">
          {value === "posts" ? (
            posts.length > 0 ? (
              posts.map((post) => {
                return (
                  <Posts
                    caption={post.caption}
                    comments={post.comments}
                    likes={post.likes}
                    uploadTime={post.created}
                    postImg={post.image.path}
                    owner_profile={profilePicture}
                    username={username}
                    postId={post._id}
                    ownerId={ownerId}
                    ownerAccount={ownerAccount}
                  />
                );
              })
            ) : (
              <h1>no posts here...</h1>
            )
          ) : null}

          {value === "thougts" ? <h3>i'm thoughts and i'm waiting for creation!!</h3> : null}

          {value === "saved" ? (
            <h1>hello i'm saved items only for owner</h1>
          ) : null}
        </div>
      </div>

      <ProfileUpdate setOpen={setOpen} open={open} />
      {followUserData !== null ? (
        <SimpleSnackbar
          setSimpleSnackOpen={setSimpleSnackOpen}
          simpleSnackOpen={simpleSnackOpen}
          btn={false}
          snackBarMessage={followUserData && followUserData.message}
        />
      ) : null}

      {openConnectionsList ? <Connections openConnectionsList={openConnectionsList} setOpenConnectionsList={setOpenConnectionsList} content={followings} contentName={"Followings"}/> : null}
    </>
  );
}

export default Profile;

// 0(pin):"650c928f31c85993bdae0cba"
// 1(pin):"650c99ae3efde95f1b31a70c"
// 2(pin):"650e9c6c6c50074d3dd31c5f"
// 3(pin):"650ea0146c50074d3dd31cc6"

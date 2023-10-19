import React, { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Posts from "../common_components/posts"
import Button from '@mui/material/Button';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts } from "../../redux/actions/UserActions";

function Profile({ username,
  name,
  bio,
  socialLinks,
  profilePicture,
  followers,
  followings,
  ownerId,
  ownerAccount,
  posts
}) {

  const [value, setValue] = useState("posts");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // custom styles for material componets
  const tabStyle = {
    margin: "0px 30px",
    textTransform: "lowercase"
  }

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
            {
              ownerAccount ? <button className="profile-editbtn"> <span ><FaUserEdit /></span>Edit Profile</button> : <div> <Button variant="contained" size="small">Follow</Button> <IconButton color="secondary" aria-label="add an alarm">
                <TextsmsOutlinedIcon />
              </IconButton></div>

            }
          </div>
          <div className="connections-info">
            <div className="info-btns">
              <button className="followers-btn">
                <span>
                  Posts
                </span>
                <span >
                  {posts.length}
                </span>
              </button>
              <button className="followers-btn">
                <span>
                  Followers
                </span>
                <span >
                  {followers.length}
                </span>
              </button>
              <button className="followings-btn">
                <span>
                  Followings
                </span>
                <span >
                  {followings.length}
                </span>
              </button>
            </div>
          </div>
          <div className="prfile-mid">
            <p>
              {bio}
            </p>
            <a href={socialLinks}>{socialLinks}</a>
          </div>

        </div>
      </div >

      <div className="profile-bottom">
        <Box sx={{
          width: '100%',
          display: "flex",
          justifyContent: "space-around",
          marginTop: "-20px"
        }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab value="posts" label="Posts" sx={tabStyle} />
            <Tab value="thougts" label="Thougts" sx={tabStyle} />
            {
              ownerAccount && <Tab value="saved" label="Saved" sx={tabStyle} />
            }

          </Tabs>
        </Box>

        <div className="profile-posts">
          {
            value === "posts" ? posts.length > 0 ? posts.map((post) => {
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

                />
              )
            }) : <h1>no posts here...</h1> : null
          }

          {
            value === "thougts" ? <h1>hello im Thougts</h1> : null
          }

          {
            value === "saved" ? <h1>hello i'm saved items only for owner</h1> : null
          }

        </div>
      </div>
    </>
  );

}

export default Profile;

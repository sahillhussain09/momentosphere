import React, { useEffect } from "react";
import { GoHomeFill } from "react-icons/go";
import { BiSearch } from "react-icons/bi";
import { MdExplore } from "react-icons/md";
import { BsChatSquareTextFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { BiSolidCommentAdd } from "react-icons/bi";
import logo from "/logo/network logo.png";
import profile from "/logo/profile.jpeg";
import "../../styles/Home.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { loadUser, logOut } from "../../redux/actions/UserActions";
import dummyImg from "../../assets/images/dummyuserprofile.png"
import { RotatingLines } from "react-loader-spinner";
import { Button } from "@mui/material";
import Uploder from "../create/Uploder"

function LeftMenu() {

  const logoutDispatch = useDispatch();
  const loadMyProfile = useDispatch();
  const { data } = useSelector((state) => state.loadMyProfile);
  const { loading, error, logoutAuth } = useSelector((state) => state.logoutReducer);
  const homeNavigate = useNavigate()
  const [open, setOpen] = React.useState(false);

  const logoutHandle = async () => {
    logoutDispatch(logOut());
  }

  const handleClickOpen = () => {
    setOpen(true);
  };


  return (
    <>
      <div className="leftmenu">
        <div className="leftmenu-top">
          <img src={logo} alt="logo" style={{ height: "25px", width: "25px" }} />
          <Link to={"/home"}>MomentoSphere</Link>
        </div>

        <div className="leftmenu-nav">
          <Link to={"/"} className="navlink">
            <p><GoHomeFill /></p>
            <h3>Home</h3>
          </Link>
          <Link className="navlink">
            <p><BiSearch /></p>
            <h3>Search</h3>
          </Link>
          <Link className="navlink">
            <p><MdExplore /></p>
            <h3>Explore</h3>
          </Link>
          <Link className="navlink">
            <p><BsChatSquareTextFill /></p>
            <h3>Messages</h3>
          </Link>
          <Link className="navlink">
            <p><AiOutlineHeart /></p>
            <h3>Notification</h3>
          </Link>
          <Link className="navlink" onClick={handleClickOpen}>
            <p><BiSolidCommentAdd /></p>
            <h3>Create</h3>
          </Link>
        </div>

        <Link to={"/myprofile"} className="leftmenu-profile">
          <div className="img-gr">
            <img src={data && data.user.profile ? data.user.profile.url : dummyImg} alt="profile" />
          </div>
          <h2>{data && data.user.username}</h2>
        </Link>

        <div className="logout">
          <Button variant="outlined" size="small" color="secondary" sx={{
            width: "100%",
            textTransform: "capitalize",
            marginTop: "10px"
          }} onClick={logoutHandle}> {
              loading ? <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="1"
                width="22"
                visible={true}
              /> : "logout"
            }</Button>

        </div>
      </div>

      <Uploder open={open} setOpen={setOpen} />

    </>
  );
}

export default LeftMenu;

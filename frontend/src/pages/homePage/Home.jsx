import React, { useEffect, useState } from "react";
import "../../styles/Home.css";
import { loadUser } from "../../redux/actions/UserActions";
import { useDispatch, useSelector } from "react-redux";

import LeftMenu from "../../components/navbars/LeftMenu";
import HomeMid from "./HomeMid";
function Home() {


  return (
    <div className="home">
      <div className="home-left">
        <LeftMenu />
      </div>
      <div className="home-mid">
        <HomeMid />
      </div>
      <div className="home-right">homeright</div>
    </div>
  );
}

export default Home;

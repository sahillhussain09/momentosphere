import React from "react";
import { BiImageAdd } from "react-icons/bi";
import profileimg from "/logo/profile.jpeg";

function Story() {
  return (
    <div className="story-cont">
      <div className="upload-story">
        <img src={profileimg} alt="" />
        <span className="upload-icon">
          <BiImageAdd />
        </span>
      </div>
      <div className="stories-list">
        <div className="frnd-story">
          <div className="story-border">
            <img src={profileimg} alt="" />
          </div>
          <p>username</p>
        </div>
        <div className="frnd-story">
          <div className="story-border">
            <img src={profileimg} alt="" />
          </div>
          <p>samir_khan</p>
        </div>
        <div className="frnd-story">
          <div className="story-border">
            <img src={profileimg} alt="" />
          </div>
          <p>atif</p>
        </div>
        <div className="frnd-story">
          <div className="story-border">
            <img src={profileimg} alt="" />
          </div>
          <p>sahil</p>
        </div>
        <div className="frnd-story">
          <div className="story-border">
            <img src={profileimg} alt="" />
          </div>
          <p>sahil</p>
        </div>
        <div className="frnd-story">
          <div className="story-border">
            <img src={profileimg} alt="" />
          </div>
          <p>sahil</p>
        </div>
        <div className="frnd-story">
          <div className="story-border">
            <img src={profileimg} alt="" />
          </div>
          <p>sahil</p>
        </div>
        <div className="frnd-story">
          <div className="story-border">
            <img src={profileimg} alt="" />
          </div>
          <p>sahil</p>
        </div>
        <div className="frnd-story">
          <div className="story-border">
            <img src={profileimg} alt="" />
          </div>
          <p>sahil</p>
        </div>
        <div className="frnd-story">
          <div className="story-border">
            <img src={profileimg} alt="" />
          </div>
          <p>sahil</p>
        </div>
        <div className="frnd-story">
          <div className="story-border">
            <img src={profileimg} alt="" />
          </div>
          <p>sahil</p>
        </div>
        <div className="frnd-story">
          <div className="story-border">
            <img src={profileimg} alt="" />
          </div>
          <p>rashmika</p>
        </div>
      </div>
    </div>
  );
}

export default Story;

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import ClearIcon from "@mui/icons-material/Clear";
import DialogTitle from "@mui/material/DialogTitle";
import "../../styles/Profile.css";
import Avatar from "@mui/material/Avatar";
import { Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { followUser } from "../../redux/actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import SimpleSnackbar from "../common_components/simpleSnackbar";
import ConnectionsList from "../common_components/ConnectionsList";

export default function AlertDialog({
  openConnectionsList,
  setOpenConnectionsList,
  content,
  contentName,
}) {
  const myProfileData = useSelector((state) => state.loadMyProfile.data);
  const userFollowData = useSelector((state) => state.followUser.data);
  const [simpleSnackOpen, setSimpleSnackOpen] = useState(false);

  const handleClose = (userId) => {
    if (myProfileData && myProfileData.user._id !== userId) {
      setOpenConnectionsList(false);
      useNavigate(`/user_profile/`);
    }
    {
      return false;
    }
  };

  // console.log("followuser request", userFollowData);
  // console.log("myprofiledata from conncetions", myProfileData);

  return (
    <React.Fragment>
      <Dialog
        open={openConnectionsList}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          id="alert-dialog-title"
        >
          <span style={{ cursor: "pointer" }}>{contentName}</span>
          <DialogActions>
            <Button size="small" variant="outlined" onClick={handleClose}>
              <ClearIcon sx={{ color: "red" }} />
            </Button>
          </DialogActions>
        </DialogTitle>
        <DialogContent>
          {content.map((elem) => {
            return (
              <ConnectionsList
                username={elem.username}
                avatar={elem.profile.url}
                name={elem.name}
                userId={elem._id}
                myProfileData={myProfileData !== null && myProfileData}
                userFollowData={userFollowData}
                setSimpleSnackOpen={setSimpleSnackOpen}
                handleClose={handleClose}
                connectionsContents = {elem.followers.length > 0 ? elem.followers : null}
              />
            );
          })}
        </DialogContent>
        {userFollowData && (
          <SimpleSnackbar
            btn={false}
            simpleSnackOpen={simpleSnackOpen}
            setSimpleSnackOpen={setSimpleSnackOpen}
            snackBarMessage={userFollowData && userFollowData.message}
          />
        )}
      </Dialog>
    </React.Fragment>
  );
}


// this feature still pending..
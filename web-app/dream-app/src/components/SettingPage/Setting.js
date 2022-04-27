import "../Homepage/homepage.scss";
import React, { useEffect, useState } from "react";
import { faImagePortrait } from "@fortawesome/free-solid-svg-icons/faImagePortrait";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket";
import { faBan } from "@fortawesome/free-solid-svg-icons/faBan";
import UpdateInfo from "./updateinfo";
import UpdatePsd from "./updatepsd";
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import list from "../../images/person-icon-leader-icon-png.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons/faKey";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useNavigate } from "react-router-dom";
import SignInForm from "../SignInForm/SignInForm";
import axios from "axios";

function Setting() {
  const userid = localStorage.getItem("userid");
  const [nickname, setNickname] = useState(localStorage.getItem("nickname"));
  const [image, setImage] = useState(localStorage.getItem("image"));
  const email = localStorage.getItem("email");
  function getPanel3View() {
    switch (optionPanel3) {
      case 1:
        return (
          <UpdateInfo nicknameChanger={setNickname} imageChanger={setImage} />
        );
      case 2:
        return <UpdatePsd />;
      default:
        return null;
    }
  }
  const [optionPanel3, setOptionPanel3] = useState(1);

  //Alerts dialog
  const [DeleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleDeleteClickOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleLogoutClose = () => {
    setLogoutDialogOpen(false);
  };

  const handleLogoutOpen = () => {
    setLogoutDialogOpen(true);
  };

  let navigate = useNavigate();
  function handleLogOut(event) {
    localStorage.setItem("userid", "");
    localStorage.setItem("nickname", "");
    localStorage.setItem("email", "");
    localStorage.setItem("image", "");
    navigate("../index", { replace: true });
  }
  function handleDelete(event) {
    localStorage.setItem("userid", "");
    localStorage.setItem("nickname", "");
    localStorage.setItem("email", "");
    localStorage.setItem("image", "");
    axios
      .delete(
        "http://ec2-3-237-83-59.compute-1.amazonaws.com:7777/users/" + userid
      )
      .then((response) => {
        navigate("../index", { replace: true });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Grid
      container
      direction="row"
      alignItems="stretch"
      sx={{ height: "100%" }}
      columns={26}
    >
      <Grid item xs={7}>
        {/* greeting header section*/}
        <List>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                src={image}
                variant="square"
                sx={{ width: 50, height: 50 }}
              >
                {nickname.substring(0, 1)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={nickname} secondary={email} />
          </ListItem>
        </List>

        {/* setting options section */}
        <List>
          {/* update info button */}
          <ListItemButton
            divider={true}
            onClick={() => {
              setOptionPanel3(1);
            }}
            sx={{ backgroundColor: optionPanel3 === 1 ? "#e8e8e8" : "white" }}
          >
            <ListItemIcon>
              <FontAwesomeIcon icon={faImagePortrait} />
            </ListItemIcon>
            <ListItemText primary="Update Information" />
          </ListItemButton>

          {/* modify password button */}
          <ListItemButton
            divider={true}
            onClick={() => {
              setOptionPanel3(2);
            }}
            sx={{ backgroundColor: optionPanel3 === 2 ? "#e8e8e8" : "white" }}
          >
            <ListItemIcon>
              <FontAwesomeIcon icon={faKey} />
            </ListItemIcon>
            <ListItemText primary="Modify Password" />
          </ListItemButton>

          {/* logout button */}
          <ListItemButton
            divider={true}
            onClick={() => {
              handleLogoutOpen();
            }}
          >
            <ListItemIcon>
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>

          {/* delete account button */}
          <ListItemButton divider={true} onClick={handleDeleteClickOpen}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faBan} />
            </ListItemIcon>
            <ListItemText primary="Delete Account" />
          </ListItemButton>
        </List>

        {/* Logout Warning dialog */}
        <Dialog open={logoutDialogOpen}>
          <DialogTitle id="alert-dialog-title">{"Warning!"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to logout?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleLogOut();
                handleLogoutClose();
              }}
            >
              Confirm
            </Button>
            <Button onClick={handleLogoutClose}>Cancel</Button>
          </DialogActions>
        </Dialog>

        {/* delete account Warning dialog */}
        <Dialog
          open={DeleteDialogOpen}
          onClose={handleDeleteClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Warning! Delete Account"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to Delete you account?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleDelete();
                handleDeleteClose();
              }}
            >
              Confirm
            </Button>
            <Button onClick={handleDeleteClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Grid>

      <Grid item xs={19}>
        {getPanel3View()}
      </Grid>
    </Grid>
  );
}

export default Setting;

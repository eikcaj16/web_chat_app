import React, { useState } from "react";
import "../Homepage/homepage.scss";
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Avatar,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import userself from "../../images/person-icon-leader-icon-png.png";

function ContactDetails(props) {
  const friend_id = props.friend.uid;
  const friend_email = props.friend.username
    ? props.friend.username
    : "Friend_email";
  const friend_nickname = props.friend.nickname
    ? props.friend.nickname
    : "Friend_nickname";
  const friend_photo = props.friend.photoURL ? props.friend.photoURL : "";

  const userid = localStorage.getItem("userid");
  const email = localStorage.getItem("email");
  const nickname = localStorage.getItem("nickname");

  //Alert Dialog
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let navigate = useNavigate();
  function handleDelete() {
    axios
      .delete(
        "http://ec2-54-224-7-114.compute-1.amazonaws.com:7777/users/" +
          userid +
          "/contacts",
        {
          friend_username: friend_email,
        }
      )
      .then((response) => {
        navigate("../homepage", { replace: true });
      })
      .catch(function (error) {
        alert(error);
        console.log(userid);
        console.log(friend_id);
        console.log(friend_email);
      });
  }

  return (
    <Grid
      marginTop={20}
      container
      direction="column"
      justifyItems="center"
      alignItems="center"
      sx={{ height: "100%" }}
    >
      <Avatar src={userself} variant="square" sx={{ width: 70, height: 70 }} />

      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItem>
          <ListItemText
            primary={friend_nickname}
            primaryTypographyProps={{ textAlign: "center" }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={friend_email}
            primaryTypographyProps={{ textAlign: "center" }}
          />
        </ListItem>
      </List>

      <Button variant="contained" sx={{ width: "40%" }} onClick={handleOpen}>
        Delete
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Update Password"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to DELETE this friend?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleDelete();
              handleClose();
            }}
          >
            Confirm
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default ContactDetails;

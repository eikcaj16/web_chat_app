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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import userself from "../../images/person-icon-leader-icon-png.png";

function ContactDetails(props) {
  const friend_username = props.username ? props.username : "Friend_username";
  const friend_nickname = props.nickname ? props.nickname : "Friend_nickname";
  const friend_photo = props.photoURL ? props.photoURL : "";

  const userid = localStorage.getItem("userid");
  const email = localStorage.getItem("email");
  const nickname = localStorage.getItem("nickname");

  //Alert Dialog
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  //   function handleDelete(event){
  //     axios.delete("http://ec2-54-224-7-114.compute-1.amazonaws.com:7777/users/" + userid + "/contacts",{
  //         friend_username: friendEmail
  //     })
  //     .then((response) => {
  //       updatePassword();
  //     })
  //     .catch(function (error) {
  //       alert("Wrong Old Password!");
  //     });
  //   }

  //   function updatePassword(){
  //     axios.put("http://ec2-54-224-7-114.compute-1.amazonaws.com:7777/users/" + userid, {
  //       password: newPassword
  //     }).then (function (r){
  //       alert("Successfully Update!")
  //     })
  //     .catch(function (error) {
  //       alert(error);
  //     });
  //   }
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
            primary={friend_username}
            primaryTypographyProps={{ textAlign: "center" }}
          />
        </ListItem>
      </List>

      <Button variant="contained" sx={{ width: "40%" }}>
        {" "}
        Delete{" "}
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
            Are you sure you want to Update you PassWord?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Confirm</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default ContactDetails;

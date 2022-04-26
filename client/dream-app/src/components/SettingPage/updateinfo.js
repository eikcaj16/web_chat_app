import React, { useEffect, useState } from "react";
import { Avatar, Button, Grid, InputLabel, TextField } from "@mui/material";
import axios from "axios";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function UpdateInfo({ nicknameChanger, imageChanger }) {
  //Alerts dialog
  const [ConfirmOpen, setConfirmOpen] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [image, setImage] = React.useState(localStorage.getItem("image"));

  const handleSubmitClickOpen = () => {
    setConfirmOpen(true);
  };

  const handleSubmitClose = () => {
    setConfirmOpen(false);
  };

  const handleAlertOpen = () => {
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };
  function handleUploadClick(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      const form = new FormData();
      form.append("image", file);
      axios({
        method: "post",
        url:
          "http://ec2-54-224-7-114.compute-1.amazonaws.com:7777/users/" +
          userid +
          "/pic",
        data: form,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          getImage();
          event.target.filesRemoved();
        })
        .catch(function (error) {});
    };
  }

  function getImage() {
    axios
      .get(
        "http://ec2-54-224-7-114.compute-1.amazonaws.com:7777/users/" +
          userid +
          "/pic"
      )
      .then((response) => {
        let random = Math.random();
        localStorage.setItem("image", response.data.img_url + "?" + random);
        imageChanger(response.data.img_url + "?" + random);
        setImage(localStorage.getItem("image") + "?" + Math.random());
      })
      .catch(function (error) {
        localStorage.setItem("image", "null");
        console.log(error);
      });
  }
  //control submit actions
  const [inputs, setInputs] = useState({});
  //handle click action
  const userid = localStorage.getItem("userid");
  const [dialogText, setDialogText] = useState("");
  function handleSubmit(event) {
    handleSubmitClose();
    if (inputs.length === 0) {
      setDialogText("new nickname cannot be empty!");
      handleAlertOpen();
      return;
    }
    axios
      .put(
        "http://ec2-54-224-7-114.compute-1.amazonaws.com:7777/users/" + userid,
        {
          nickname: inputs,
        }
      )
      .then(function (r) {
        nicknameChanger(inputs);
        localStorage.setItem("nickname", inputs);
      })
      .catch(function (error) {
        setDialogText(error);
        handleAlertOpen();
      });
  }

  return (
    <Grid
      container
      direction="column"
      justifyItems="center"
      alignItems="center"
      sx={{ height: "100%" }}
    >
      <Grid item xs={3} marginTop={15}>
        <Avatar src={image} variant="square" sx={{ width: 50, height: 50 }}>
          {localStorage.getItem("nickname").substring(0, 1)}
        </Avatar>
      </Grid>
      <Grid item xs={1}>
        <Button variant="contained">
          <input accept="image/*" type="file" onChange={handleUploadClick} />
          Upload Profile Picture
        </Button>
      </Grid>
      <Grid item xs={2}>
        <InputLabel sx={{ fontSize: 20 }}>New NickName</InputLabel>
        <br />
        <TextField
          placeholder="New Nickname"
          onChange={(e) => {
            setInputs(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={2}>
        <Button variant="contained" onClick={handleSubmitClickOpen}>
          Submit
        </Button>
        <Dialog
          open={ConfirmOpen}
          onClose={handleSubmitClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Update Account"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure to update the nickname?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit}>Confirm</Button>
            <Button onClick={handleSubmitClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={alertOpen}
          onClose={handleAlertClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogText}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmitClose}>Got it!</Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
}

export default UpdateInfo;

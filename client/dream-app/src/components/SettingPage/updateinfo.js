import React, { useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  InputLabel,
  TextField
} from "@mui/material";
import axios from "axios";


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Input} from "@mui/icons-material";


function UpdateInfo(){

//Alerts dialog
  const [ConfirmOpen, setConfirmOpen] = React.useState(false);
  const [alertOpen,setAlertOpen] = React.useState(false);


  const handleSubmitClickOpen = () => {
    setConfirmOpen(true);
  };


  const handleSubmitClose = () => {
    setConfirmOpen(false);
  };

  const handleAlertOpen = () => {
    setAlertOpen(true);
  }

  const handleAlertClose = () => {
    setAlertOpen(false);

  }
  function handleUploadClick (event){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function(e) {
      const form = new FormData();
      form.append("image", reader.result.toString());
      console.log(form.get("image"))
      axios({
        method: "post",
        url: "http://localhost:7777/users/" + userid + "/pic",
        data: form,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(response => {
        alert("Success!");
      })
      .catch(function(error) {
      });
    }

  }
    //control submit actions
    const [inputs, setInputs] = useState({});
    //handle click action
    const userid = localStorage.getItem("userid");
    const [dialogText,setDialogText] = useState("");
    function handleSubmit(event) {
      handleSubmitClose();
      if (inputs.length === 0){
        setDialogText("new nickname cannot be empty!");
        handleAlertOpen();
        return;
      }
      axios.put("http://localhost:7777/users/" + userid, {
        nickname: inputs
      }).then (function (r){
        localStorage.setItem("nickname",inputs);
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
            sx={{ height: '100%' }}>
          <Grid item xs={3} marginTop={15}>
            <Avatar variant="square">
              N
            </Avatar>
          </Grid>
          <Grid item xs={1} >
            <Button variant="contained"><input
                accept="image/*"
                type="file"
                onChange={handleUploadClick}
            />Upload Profile Picture</Button>
          </Grid>
          <Grid item xs={2} >
            <InputLabel sx={{fontSize:20}}>New NickName</InputLabel><br/>
            <TextField placeholder="New Nickname" onChange={(e)=>{setInputs(e.target.value);
            }}/>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" onClick={handleSubmitClickOpen} >Submit</Button>
            <Dialog
                open={ConfirmOpen}
                onClose={handleSubmitClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Update Account"}
              </DialogTitle>
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
            <DialogTitle id="alert-dialog-title">
              {"Alert"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {dialogText}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSubmitClose}>Got it!</Button>
            </DialogActions>
          </Dialog>


          </Grid>
        </Grid>
    );
}

export default UpdateInfo
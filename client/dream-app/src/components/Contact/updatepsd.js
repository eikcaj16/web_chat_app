import "./homepage.scss";
import {
  Button,
  Grid,
  TextField
} from "@mui/material";
import axios from "axios";


function UpdatePsd(){

  let oldPassword;
  let newPassword;
  let newPassword2;
  const userid = localStorage.getItem("userid");
  const username = localStorage.getItem("email");
  function handleSubmit(event){
    if (oldPassword === undefined || oldPassword.length === 0){
      alert("Old Password cannot be empty")
      return;
    }
    if (newPassword === undefined || newPassword.length === 0){
      alert("New Password cannot be empty")
      return;
    }
    if (newPassword2 === undefined ||newPassword2.length === 0){
      alert("Confirm new password cannot be empty")
      return;
    }
    if (newPassword !== newPassword2){
      alert("New password is different with confirm new password")
      return;
    }
    axios.post('http://localhost:7777/users/login',{
      username:username,
      password:oldPassword
    })
    .then((response) => {
      updatePassword();
    })
    .catch(function (error) {
      alert("Wrong Old Password!");
    });
  }
  function updatePassword(){
    axios.put("http://localhost:7777/users/" + userid, {
      password: newPassword
    }).then (function (r){
      alert("Successfully Update!")
    })
    .catch(function (error) {
      alert(error);
    });
  }
    return (
        <Grid
            marginTop={20}
            container
            direction="column"
            justifyItems="center"
            alignItems="center"
            sx={{ height: '100%'}}>
          <TextField
              sx={{width:'50%'}}
              label="Old Password"
              variant="standard"
              type="password"
              onChange={(event => oldPassword = event.target.value)}
          />
          <TextField
              sx={{width:'50%'}}
              label="New Password"
              variant="standard"
              type="password"
              onChange={(event => newPassword = event.target.value)}
          />
          <TextField
              sx={{width:'50%'}}
              label="Confirm New Password"
              variant="standard"
              type="password"
              onChange={(event => newPassword2 = event.target.value)}
          /><br/>
          <Button variant="contained" sx={{width:'50%'}} onClick={handleSubmit}> Submit </Button>
        </Grid>
    );





}

export default UpdatePsd
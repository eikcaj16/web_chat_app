import React, { useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  InputLabel,
  TextField
} from "@mui/material";
import axios from "axios";


function UpdateInfo(){
    //control submit actions
    const [inputs, setInputs] = useState({});
    //handle click action
    const userid = localStorage.getItem("userid");
    function handleSubmit(event) {
      if (inputs.length === 0){
        alert("new nickname cannot be empty!");
        return;
      }
      axios.put("http://localhost:7777/users/" + userid, {
        nickname: inputs
      }).then (function (r){
        alert("Successfully Update!")
      })
      .catch(function (error) {
        alert(error);
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
            <Button variant="contained">Upload Profile Picture</Button>
          </Grid>
          <Grid item xs={2} >
            <InputLabel sx={{fontSize:20}}>New NickName</InputLabel><br/>
            <TextField placeholder="New Nickname" onChange={(e)=>{setInputs(e.target.value);
            }}/>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
          </Grid>
        </Grid>
    );
}

export default UpdateInfo
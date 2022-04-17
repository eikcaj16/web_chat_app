import React, { useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  InputLabel,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from "@mui/material";
import friend from "../../images/friend-pic.jpeg";
import axios from "axios";


function Chatbox(){
  
    //handle click action
    const userid = localStorage.getItem("userid");


    return (
        <Grid
            container
            direction="column"
            justifyItems="center"
            alignItems="left"
            sx={{ height: '100%' }}>

            <List>
            <ListItem  alignItems="flex-start" sx={{borderBottom: 1, borderColor: 'grey.300', height:60}}>
                <ListItemAvatar>
                    <Avatar  variant="square" src={friend}></Avatar>
                </ListItemAvatar>
                <ListItemText primary="Nickname" />
            </ListItem>
            </List>

        </Grid>
    );
}

export default Chatbox;
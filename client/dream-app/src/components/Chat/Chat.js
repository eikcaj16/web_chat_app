import React, { useState } from "react";
import "../Homepage/homepage.scss";
import {
  Avatar, Grid, IconButton,
  List,
  ListItem,
  ListItemAvatar, ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import TextField from '@mui/material/TextField';
import list from "../../images/person-icon-leader-icon-png.png";
import friend from "../../images/friend-pic.jpeg";
import AddIcon from '@mui/icons-material/Add';
import ChatBox from "./ChatBox";
import axios from "axios";


function Chat(){
    const userid = localStorage.getItem("userid");
    const email = localStorage.getItem("email");
    const nickname = localStorage.getItem("nickname");

    const [chatbox, setChatbox]=useState(false);

    function getChatBoxView() {
        if(chatbox)
        return <ChatBox />;
    }

    return (
    <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="stretch"
        columns={26}>
        
        {/* greeting header section*/}     
        <Grid item xs={7}>
            <List>
                <ListItem  alignItems="flex-start" >
                    <ListItemAvatar>
                    <Avatar src={list}  variant="square" sx={{ width: 50,height: 50}}/>
                    </ListItemAvatar>
                    <ListItemText primary={nickname} secondary={email} />
                </ListItem>
            </List>

       {/* chat options section*/}
            {/* start a new chat button */}
            <ListItemButton divider={true} onClick={()=>{
                //TODO: select friends to start chat
                }} sx={{borderTop: 1, borderColor: "lightgray", height:40}}>
                <ListItemText secondary="Start a new chat" sx={{ml:4}}/>
                <IconButton edge="end" sx={{mr:3}}> <AddIcon color={"secondary"}/> </IconButton>
            </ListItemButton>
 
             {/* chat list */}
            <ListItemButton divider={true} onClick={()=>{
                setChatbox(true);
                }} sx={{backgroundColor:chatbox ===  true? '#e8e8e8' : 'white', height:60}}>
                <ListItemAvatar>
                    <Avatar  variant="square" src={friend}></Avatar>
                </ListItemAvatar>
                <div>
                    <ListItemText primary="Nickname" secondary="Message preview..." />
                </div>
                <div style={{textAlign:'right', flex:1}}> 
                 <Typography variant="body2" textAlign='right' style={{color:"#a1a1a1"}}>19:00</Typography>
                </div>
            </ListItemButton>
        
      {/* <List sx={{ width: '100%'}}>
      {contact.map((row) => (
          <div>
          <ListItemButton>
          <ListItem  alignItems="flex-start" divider={true}>
            <ListItemAvatar>
              <Avatar src={list}/>
            </ListItemAvatar>
            <ListItemText primary={row.nickname} secondary={row.username} />
          </ListItem>
          </ListItemButton>
          </div>
      ))}
      </List> */}
      </Grid>

      {/* chatbox panel */}
        <Grid item xs={19}>
          {getChatBoxView()}
        </Grid>
    </Grid>
    );
}

export default Chat;
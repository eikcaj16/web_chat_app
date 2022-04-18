import React, { useState } from "react";
import "../Homepage/homepage.scss";
import "./StartChat.scss"
import {
  Avatar, Grid, IconButton, Button,
  List,
  ListItem,
  ListItemAvatar, ListItemButton,
  ListItemText,
  Typography,
  TextField,
  Dialog, DialogActions, DialogContent,DialogContentText
} from "@mui/material";
import list from "../../images/person-icon-leader-icon-png.png";
import friend from "../../images/friend-pic.jpeg";
import AddIcon from '@mui/icons-material/Add';
import ChatBox from "./ChatBox";
import axios from "axios";


function Chat(){
    const userid = localStorage.getItem("userid");
    const email = localStorage.getItem("email");
    const nickname = localStorage.getItem("nickname");
    // const timestamp = ;
    const data = [];
    const [chatbox, setChatbox]=useState(false);
    const [contact,setContact] = useState(data);
    const [open, setOpen] = React.useState(false);
    const [filter, setFilter] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const loadData = () => {
        axios
        .get("http://localhost:7777/users/"+userid+"/contacts")
        .then((res) => {
          setContact(res.data);
        })
      };
      loadData();

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
            <ListItemButton divider={true} onClick={handleClickOpen} sx={{borderTop: 1, borderColor: "lightgray", height:40}}>
                <ListItemText secondary="Start a new chat" sx={{ml:4}}/>
                <IconButton edge="end" sx={{mr:3}}> <AddIcon color={"secondary"}/> </IconButton>
            </ListItemButton>

            {/* choose friends to start a new chat */}
            <Dialog open={open} onClose={handleClose} className="chooseDialog">
                <DialogContent>
                    <DialogContentText className="text">
                    Choose contact to start a chat 
                    </DialogContentText>
                    <TextField className="searchFriends" fullWidth label="Search" 
                    variant="outlined" value={filter}
                    onChange={event => setFilter(event.target.value)}/>

                    <List sx={{ width: '100%'}}>
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
                    </List>
                </DialogContent>  
                <DialogActions>
                    <Button onClick={handleClose} className="cancelBtn">Cancel</Button>
                </DialogActions>
            </Dialog>
 
             {/* chat list */}
            <ListItemButton divider={true} onClick={()=>{
                setChatbox(true);
                }} sx={{backgroundColor:chatbox ===  true? '#e8e8e8' : 'white', height:60}}>

                {/* load profile photo of friend in chat here*/}
                <ListItemAvatar>
                    <Avatar  variant="square" src={friend}></Avatar>
                </ListItemAvatar>

                {/* load friend's nickname and chat preview here*/}
                <div>
                    <ListItemText primary="Nickname" secondary="Message preview..." />
                </div>

                {/* load latest message timestamp here */}
                <div style={{textAlign:'right', flex:1}}> 
                 <Typography variant="body2" textAlign='right' style={{color:"#a1a1a1"}}>19:00</Typography>
                </div>
            </ListItemButton>
      </Grid>

      {/* chatbox panel */}
        <Grid item xs={19}>
          {getChatBoxView()}
        </Grid>
    </Grid>
    );
}

export default Chat;
import React, { useState } from "react";
import {
  Avatar, Grid, IconButton,
  List,
  ListItem,
  ListItemAvatar, ListItemButton,
  ListItemText
} from "@mui/material";
import TextField from '@mui/material/TextField';
import list from "../../images/person-icon-leader-icon-png.png";
import axios from "axios";
import "./StartChat.css"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


function StartChat(){
  const userid = localStorage.getItem("userid");
  const data = [];
  const [contact,setContact] = useState(data);

   const loadData = () => {
    axios
    .get("http://localhost:7777/users/"+userid+"/contacts")
    .then((res) => {
      setContact(res.data);
    })
  };
  loadData();


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const [filter, setFilter] = useState('');
  

    return (
        <div>

        {/* start a new chat button(test)  */}
        <Button className="startChatBtn" onClick={handleClickOpen}> start a new chat </Button>

        <Dialog open={open} onClose={handleClose} className="chooseDialog">
          <DialogContent>
            <DialogContentText className="text">
            Choose contact to start a chat 
            </DialogContentText>
            <TextField className="searchFriends" fullWidth label="Search" variant="outlined" value={filter}
            onChange={event => setFilter(event.target.value)} />

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

        </div>
    );

}

export default StartChat



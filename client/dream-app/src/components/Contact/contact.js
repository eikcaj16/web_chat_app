import React, { useState, useRef } from "react";
import "../Homepage/homepage.scss";
import {
  Avatar, Grid, IconButton,
  List,
  ListItem,
  ListItemAvatar, ListItemButton,
  ListItemText,
  Button,
  Dialog,DialogActions,DialogContent,DialogTitle,DialogContentText,
  Paper
} from "@mui/material";
import TextField from '@mui/material/TextField';
import list from "../../images/person-icon-leader-icon-png.png";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserPlus} from "@fortawesome/free-solid-svg-icons";


function Contact(){
  const userid = localStorage.getItem("userid");
  const email = localStorage.getItem("email");
  const nickname = localStorage.getItem("nickname");
  const data = [];
  const [contact,setContact] = useState(data);
  const [friendEmail,setFriendEmail] = useState();
  const [open, setOpen] =useState(false);
  const textInput = useRef(null);
  
  const loadData = () => {
    axios
    .get("http://ec2-54-224-7-114.compute-1.amazonaws.com:7777/users/"+userid+"/contacts")
    .then((res) => {
      setContact(res.data);
    })


  };
  const addFriends = ()=>{
    axios.post("http://ec2-54-224-7-114.compute-1.amazonaws.com:7777/users/" + userid + "/contacts", {
        friend_username: friendEmail
    }).then (function (r){
      loadData();
    })
    .catch(function (error) {
      // alert(error);
      setOpen(true);
    });
  }

  function handleClose(){
    setOpen(false);
  }

  loadData();

    return (
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="stretch"
            columns={26}
        >
          <Grid item xs={7}>
          <List>
          <ListItem  alignItems="flex-start" >
            <ListItemAvatar >
              <Avatar src={list}  variant="square" sx={{ width: 50,height: 50 }}/>
            </ListItemAvatar>
            <ListItemText primary={nickname} secondary={email} />
          </ListItem>
          </List>
          <Grid container spacing={1} style={{padding:'10px'}}>
            <Grid item xs={10}>
              <TextField fullWidth label="Add Contact by Email" variant="outlined" inputRef={textInput} onChange={(event)=>{
                setFriendEmail(event.target.value);
              }} />
            </Grid>
            <Grid item xs={2} alignSelf={'center'} >
              <IconButton color="primary" aria-label="upload picture" component="span" onClick={
                ()=>{
                  addFriends(friendEmail);
                  textInput.current.value = "";
                }}>
                <FontAwesomeIcon icon={faUserPlus} />
              </IconButton>
            </Grid>
          </Grid>
          <Paper elevation={0} sx={{maxHeight: '360px', overflow: 'auto'}}>
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
          </Paper>
          </Grid>
          <Dialog
                open={open}>
                <DialogTitle>
                    {"Alert"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {"Oops! Contact account not found!"}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Got it!
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}

export default Contact
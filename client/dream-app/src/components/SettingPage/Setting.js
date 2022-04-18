import "../Homepage/homepage.scss";
import React, {useState} from "react";
import {faImagePortrait} from "@fortawesome/free-solid-svg-icons/faImagePortrait";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket";
import {faBan} from "@fortawesome/free-solid-svg-icons/faBan";
import UpdateInfo from "./updateinfo";
import UpdatePsd from "./updatepsd";
import {
  Avatar, Grid,
  List,
  ListItem,
  ListItemAvatar, ListItemButton, ListItemIcon,
  ListItemText
} from "@mui/material";
import list from "../../images/person-icon-leader-icon-png.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faKey} from "@fortawesome/free-solid-svg-icons/faKey";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useNavigate } from "react-router-dom";
import SignInForm from "../SignInForm/SignInForm";





function Setting(){
  const userid = localStorage.getItem("userid");
  const email = localStorage.getItem("email");
  const nickname = localStorage.getItem("nickname");
  function getPanel3View() {
    switch (optionPanel3) {
      case 1:
        return <UpdateInfo />
      case 2:
        return <UpdatePsd />
      default:
        return null
    }
  }
  const [optionPanel3,setOptionPanel3] = useState(1);

  //Alerts dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };



  let navigate = useNavigate();
  function handleLogOut(event) {
            event.preventDefault();
            
                navigate("/homepage");
        }



    return (
        <Grid
            container
            direction="row"
            alignItems="stretch"
            sx={{ height: '100%' }}
            columns={26}>
            

          <Grid item xs={7}>
          {/* greeting header section*/}
          <List>
            <ListItem  alignItems="flex-start" >
              <ListItemAvatar >
                <Avatar src={list} variant="square" sx={{ width: 50,height: 50 }}/>
              </ListItemAvatar>
              <ListItemText primary={nickname} secondary={email} />
            </ListItem>
          </List>

          {/* setting options section */}
          <List>
            {/* update info button */}
            <ListItemButton divider={true} onClick={()=>{
              setOptionPanel3(1);
            }} sx={{backgroundColor:optionPanel3 === 1 ? '#e8e8e8' : 'white'}}>
              <ListItemIcon>
                <FontAwesomeIcon icon={faImagePortrait} />
              </ListItemIcon>
              <ListItemText primary="Update Information" />
            </ListItemButton>

             {/* modify password button */}
            <ListItemButton divider={true} onClick={()=>{
              setOptionPanel3(2);
            }} sx={{backgroundColor:optionPanel3 === 2 ? '#e8e8e8' : 'white'}}>
              <ListItemIcon>
                <FontAwesomeIcon icon={faKey} />
              </ListItemIcon>
              <ListItemText primary="Modify Password" />
            </ListItemButton>

             {/* logout button */}
            <ListItemButton divider={true} onClick={()=>{
              setOptionPanel3(0);
            }}>
              <ListItemIcon>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>

            {/* delete account button */}
            <ListItemButton divider={true} onClick={handleClickOpen}>
              <ListItemIcon>
                <FontAwesomeIcon icon={faBan} />
              </ListItemIcon>
              <ListItemText primary="Delete Account" />
            </ListItemButton>
          </List>

            {/* delete account Warning dialog */}
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                  {"Warning! Delete Account"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to Delete you account?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={()=>{
                  setOptionPanel3(3);
                }}>Confirm</Button>
                  <Button onClick={handleClose}>Close</Button>
                  <Button onClick={handleClose} >Cancel</Button>
                </DialogActions>
            </Dialog>

            </Grid>

          <Grid item xs={19}>
          {getPanel3View()}
          </Grid>

        </Grid>
    );





}

export default Setting
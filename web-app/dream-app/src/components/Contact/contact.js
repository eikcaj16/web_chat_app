import React, { useState, useRef, useEffect } from "react";
import "../Homepage/homepage.scss";
import {
  Avatar,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Paper,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import list from "../../images/person-icon-leader-icon-png.png";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import ContactDetails from "./ContactDetails";
import { Login } from "@mui/icons-material";

function Contact() {
  const userid = localStorage.getItem("userid");
  const email = localStorage.getItem("email");
  const nickname = localStorage.getItem("nickname");
  const data = [];
  const [contact, setContact] = useState(data);
  const [friendEmail, setFriendEmail] = useState();
  const [open, setOpen] = useState(false);
  const textInput = useRef(null);
  //ContactDetails open state
  const [details, setDetails] = useState(false);
  //ContactDetails state
  const [friendId, setFriendId] = useState("");

  const loadData = () => {
    axios
      .get(
        "http://ec2-54-224-7-114.compute-1.amazonaws.com:7777/users/" +
          userid +
          "/contacts"
      )
      .then((res) => {
        let ret = [];
        res.data.forEach((c) => {
          ret.push({
            ...c,
            profile_photo: `https://info6150-msg-app.s3.amazonaws.com/profile_img/${
              c.uid
            }?${Math.random()}`,
          });
        });
        setContact(ret);
      });
  };

  //handle add friend request
  const addFriends = () => {
    axios
      .post(
        "http://ec2-54-224-7-114.compute-1.amazonaws.com:7777/users/" +
          userid +
          "/contacts",
        {
          friend_username: friendEmail,
        }
      )
      .then(function (r) {
        loadData();
      })
      .catch(function (error) {
        // alert(error);
        setOpen(true);
      });
  };

  function handleClose() {
    setOpen(false);
  }

  //get contact details view
  function getContactDetails() {
    if (details) {
      if (friendId !== "") {
        let c = contact.find((e) => e.uid === friendId);
        return (
          <ContactDetails
            friend={c}
            contactChanger={setContact}
            allContact={contact}
          />
        );
      }
    }
  }

  useEffect(async () => {
    loadData();
  }, [contact.length]);

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
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                src={localStorage.getItem("image")}
                variant="square"
                sx={{ width: 50, height: 50 }}
              >
                {nickname.substring(0, 1)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={nickname} secondary={email} />
          </ListItem>
        </List>
        <Grid container spacing={1} style={{ padding: "10px" }}>
          <Grid item xs={10}>
            <TextField
              fullWidth
              label="Add Contact by Email"
              variant="outlined"
              inputRef={textInput}
              onChange={(event) => {
                setFriendEmail(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={2} alignSelf={"center"}>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={() => {
                addFriends(friendEmail);
                textInput.current.value = "";
              }}
            >
              <FontAwesomeIcon icon={faUserPlus} />
            </IconButton>
          </Grid>
        </Grid>
        <Paper elevation={0} sx={{ maxHeight: "360px", overflow: "auto" }}>
          <List sx={{ width: "100%" }}>
            {contact.map((row) => (
              <div>
                <ListItemButton
                  onClick={() => {
                    setFriendId(row.uid);
                    setDetails(true);
                  }}
                >
                  <ListItem alignItems="flex-start" divider={true}>
                    <ListItemAvatar>
                      <Avatar src={row.profile_photo} variant="square">
                        {row.nickname.substring(0, 1)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={row.nickname}
                      secondary={row.username}
                    />
                  </ListItem>
                </ListItemButton>
              </div>
            ))}
          </List>
        </Paper>
      </Grid>

      <Grid item xs={19}>
        {getContactDetails()}
      </Grid>

      <Dialog open={open}>
        <DialogTitle>{"Alert"}</DialogTitle>
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

export default Contact;

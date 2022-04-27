import React, { useState, useEffect, useRef } from "react";
import "../Homepage/homepage.scss";
import "./StartChat.scss";
import { agoraRTMInstance } from "../Homepage/Homepage";
import {
  Avatar,
  Grid,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Paper,
} from "@mui/material";
import list from "../../images/person-icon-leader-icon-png.png";
import friend from "../../images/friend-pic.jpeg";
import AddIcon from "@mui/icons-material/Add";
import ChatBox from "./Chatbox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { imageToBlob } from "../Utils/Common";

function Chat(props) {
  // search bar
  const [query, setQuery] = useState("");
  const userid = localStorage.getItem("userid");
  const email = localStorage.getItem("email");
  const nickname = localStorage.getItem("nickname");
  const [chatbox, setChatbox] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = useState("");
  const [updatedPeerId, setUpdatedPeerId] = useState("");

  /**
   * Send a p2p message to remote users
   *
   * @param peerId the user id of the remote user
   * @param data the text message to be sent
   * @returns {Promise<boolean>} true if the message is sent successfully; o.w. false
   */
  const sendPeerMsg = async (peerId, data) => {
    const sendPeerMsgHandler = props.sendPeerMsgHandler;
    sendPeerMsgHandler(peerId, data);
  };

  /**
   * Show the latest message summary with the content of a chat
   * If this is no message, return an empty string
   *
   * @param content the content of a chat, which is a child element in msgs
   * @returns {string|*} the summery text
   */
  const showSummary = (content) => {
    if (content.length === 0) return "";
    const latest = content[content.length - 1];
    if (latest.type === "FILE") {
      return "[FILE]";
    } else if (latest.type === "IMAGE") {
      return "[IMAGE]";
    }
    const text = content[content.length - 1].text;
    if (text.length <= 15) return text;
    else return `${text.substr(0, 15)} ...`;
  };

  /**
   * Show the latest message time with the content of a chat
   * If this is no message, return an empty string
   *
   * @param content the content of a chat, which is a child element in msgs
   * @returns {string} the formatted time
   */
  const showFormattedTime = (content) => {
    if (content.length === 0) return "";
    const timeFormat = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format;
    const dt = content[content.length - 1].datetime;
    return timeFormat(dt);
  };

  const handleChatSelectOpen = () => {
    const updateContactHandler = props.updateContactHandler;
    updateContactHandler();
    setOpen(true);
  };

  const handleChatSelectClose = () => {
    setOpen(false);
  };

  function getChatBoxView() {
    if (chatbox) {
      if (updatedPeerId !== "") {
        let chatElem = props.msgs.find((c) => c.uid === updatedPeerId);
        return (
          <ChatBox msgs={chatElem} sendMsgHandler={sendPeerMsg.bind(this)} />
        );
      }
    }
  }

  /**
   * Start a new chat with a given peerId
   *
   * @param peerId the user id of the remote user
   */
  const startNewChatHandler = (peerId) => {
    const startNewChat = props.startNewChatHandler;
    startNewChat(peerId);
    handleChatSelectClose();
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="stretch"
      columns={26}
    >
      {/* greeting header section*/}
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

        {/* chat options section*/}
        {/* start a new chat button */}
        <ListItemButton
          divider={true}
          onClick={handleChatSelectOpen}
          sx={{ borderTop: 1, borderColor: "lightgray", height: 40 }}
        >
          <ListItemText
            secondary="Start a new chat"
            sx={{ textAlign: "center" }}
          />
          <IconButton edge="end">
            {" "}
            <AddIcon color={"secondary"} />{" "}
          </IconButton>
        </ListItemButton>

        {/* choose friends to start a new chat */}
        <Dialog
          open={open}
          onClose={handleChatSelectClose}
          className="chooseDialog"
        >
          <DialogContent>
            <DialogContentText className="text">
              Choose contact to start a chat
            </DialogContentText>

            {/* search by nickname */}
            <TextField
              className="searchFriends"
              fullWidth
              label="Search"
              variant="outlined"
              onChange={(event) => setQuery(event.target.value)}
            />

            <List sx={{ width: "100%" }}>
              {props.contact
                .filter((row) => {
                  if (query === "") {
                    return row;
                  } else if (
                    row.nickname.toLowerCase().includes(query.toLowerCase())
                  ) {
                    return row;
                  }
                })
                .map((row) => (
                  <div>
                    <ListItemButton
                      key={row.uid}
                      onClick={() => {
                        startNewChatHandler(row.uid);
                      }}
                    >
                      <ListItem alignItems="flex-start" divider={true}>
                        <ListItemAvatar>
                          <Avatar variant="square" src={row.profile_photo}>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleChatSelectClose} className="cancelBtn">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        {/* chat list */}
        <Paper elevation={0} sx={{ maxHeight: "410px", overflow: "auto" }}>
          <List sx={{ width: "100%" }}>
            {props.msgs.map((chatElem) => (
              <div>
                <ListItemButton
                  key={chatElem.uid}
                  divider={true}
                  onClick={() => {
                    setUpdatedPeerId(chatElem.uid);
                    setChatbox(true);
                  }}
                  sx={{
                    backgroundColor:
                      chatElem.uid === updatedPeerId ? "#e8e8e8" : "white",
                    height: 60,
                  }}
                >
                  {/* load profile photo of friend in chat here*/}
                  <ListItemAvatar>
                    <Avatar variant="square" src={chatElem.profile_photo}>
                      {chatElem.nickname.substring(0, 1)}
                    </Avatar>
                  </ListItemAvatar>

                  {/* load friend's nickname and chat preview here*/}
                  <div>
                    <ListItemText
                      primary={chatElem.nickname}
                      secondary={showSummary(chatElem.content)}
                    />
                  </div>

                  {/* load latest message timestamp here */}
                  <div style={{ textAlign: "right", flex: 1 }}>
                    <Typography
                      variant="body2"
                      textAlign="right"
                      style={{ color: "#a1a1a1" }}
                    >
                      {showFormattedTime(chatElem.content)}
                    </Typography>
                  </div>
                </ListItemButton>
              </div>
            ))}
          </List>
        </Paper>
      </Grid>
      {/* chatbox panel */}
      <Grid item xs={19}>
        {getChatBoxView()}
      </Grid>
    </Grid>
  );
}

export default Chat;

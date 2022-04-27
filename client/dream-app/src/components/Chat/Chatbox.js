import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import {
  Stack,
  List,
  ListSubheader,
  ListItemText,
  IconButton,
  Paper,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import friend from "../../images/friend-pic.jpeg";
import {
  FileLeftNewest,
  FileRightNewest,
  ImageLeftNewest,
  ImageRightNewest,
  MessageLeft,
  MessageLeftNewest,
  MessageRight,
  MessageRightNewest,
} from "./Message";
import TextInput from "./TextInput";
// import axios from "axios";
import userself from "../../images/person-icon-leader-icon-png.png";
import { fileOrBlobToDataURL } from "../Utils/Common";

const ChatBox = (props) => {
  const timeFormat = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format;

  /**
   * Sent p2p text message to a remote user
   *
   * @param data the text message
   */
  const sendPeerMsg = (data) => {
    const sendMsgHandler = props.sendMsgHandler;
    sendMsgHandler(props.msgs.uid, data);
  };

  return (
    <Stack
      container
      direction="column"
      justifyItems="center"
      alignItems="stretch"
      sx={{ height: "100%" }}
    >
      <Grid item>
        <Paper
          elevation={0}
          sx={{
            overflowY: "scroll",
            height: "100%",
            maxHeight: "550px",
            width: "100%",
            borderRadius: 5,
          }}
        >
          <List sx={{ width: "100%", p: 0 }}>
            {/* render friend's nickname */}
            <ListSubheader
              sx={{
                borderBottom: 1,
                borderColor: "grey.300",
                textAlign: "center",
                fontSize: 20,
              }}
              color="primary"
            >
              {props.msgs.nickname}

              {/* delete chat button */}
              {/* <IconButton edge="end" aria-label="delete" color={"primary"} sx={{left:"275px"}}><DeleteIcon /></IconButton> */}
            </ListSubheader>
            {/* load message list here */}
            {props.msgs.content.map((c) => {
              switch (c.type) {
                case "TEXT":
                  if (c.is_remote) {
                    return (
                      <MessageLeftNewest
                        nickname={props.msgs.nickname}
                        message={c.text}
                        timestamp={timeFormat(c.datetime)}
                        photoURL={props.msgs.profile_photo}
                      />
                    );
                  } else {
                    return (
                      <MessageRightNewest
                        nickname={localStorage.getItem("nickname")}
                        message={c.text}
                        timestamp={timeFormat(c.datetime)}
                        photoURL={localStorage.getItem("image")}
                      />
                    );
                  }
                case "IMAGE":
                  if (c.is_remote) {
                    return (
                      <ImageLeftNewest
                        nickname={props.msgs.nickname}
                        image={c.blob}
                        timestamp={timeFormat(c.datetime)}
                        photoURL={props.msgs.profile_photo}
                      />
                    );
                  } else {
                    return (
                      <ImageRightNewest
                        nickname={localStorage.getItem("nickname")}
                        image={c.blob}
                        timestamp={timeFormat(c.datetime)}
                        photoURL={localStorage.getItem("image")}
                      />
                    );
                  }
                case "FILE":
                  if (c.is_remote) {
                    return (
                      <FileLeftNewest
                        nickname={props.msgs.nickname}
                        file={c.blob}
                        fileName={c.filename}
                        timestamp={timeFormat(c.datetime)}
                        photoURL={props.msgs.profile_photo}
                      />
                    );
                  } else {
                    return (
                      <FileRightNewest
                        nickname={localStorage.getItem("nickname")}
                        file={c.blob}
                        fileName={c.filename}
                        timestamp={timeFormat(c.datetime)}
                        photoURL={localStorage.getItem("image")}
                      />
                    );
                  }
                default:
                  return;
              }
            })}
          </List>
        </Paper>
      </Grid>
      <Grid
        item
        alignItems="stretch"
        sx={{ position: "fixed", bottom: "12%", width: "100%" }}
      >
        <TextInput sendMsgHandler={sendPeerMsg.bind(this)} />
      </Grid>
    </Stack>
  );
};

export default ChatBox;

import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {
    Stack,
    List, ListSubheader,ListItemText,
    IconButton,
    Paper
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import friend from "../../images/friend-pic.jpeg";
import {MessageLeft, MessageLeftNewest, MessageRight, MessageRightNewest} from "./Message";
import TextInput from "./TextInput";
// import axios from "axios";
import userself from "../../images/person-icon-leader-icon-png.png";


const ChatBox = (props) => {
    const timeFormat = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', hour12: false}).format;

    /**
     * Sent p2p text message to a remote user
     *
     * @param msg the text message
     */
    const sendPeerTextMsg = (msg) => {
        const sendMsgHandler = props.sendMsgHandler;
        sendMsgHandler(props.msgs.uid, msg);
    }

    return (
        <Stack
            container
            direction="column"
            justifyItems="center"
            alignItems="left"
            sx={{height: '100%'}}>

            <Paper elevation={0} sx={{overflowY: 'scroll', height: "480px", width: "99%", borderRadius: 5}}>
                <List sx={{width: "100%", p: 0}}>
                    {/* render friend's nickname */}
                    <ListSubheader
                        sx={{borderBottom: 1, borderColor: 'grey.300', textAlign: "center", fontSize: 20}}
                        color="primary">
                        {props.msgs.nickname}
                        <IconButton edge="end" aria-label="delete" color={"primary"} sx={{left:"275px"}}><DeleteIcon /></IconButton>
                        </ListSubheader>
                    {/* load message list here */}
                    {
                        props.msgs.content.map((c) => {
                            if (c.is_remote) {
                                return (<MessageLeftNewest
                                    message={c.text}
                                    timestamp={timeFormat(c.datetime)}
                                    photoURL={userself}
                                />)
                            } else {
                                return (<MessageRightNewest
                                    message={c.text}
                                    timestamp={timeFormat(c.datetime)}
                                    photoURL={userself}
                                />)
                            }
                        })
                    }
                </List>
            </Paper>
            <TextInput sendMsgHandler={sendPeerTextMsg.bind(this)}/>
        </Stack>
    );
}

export default ChatBox;
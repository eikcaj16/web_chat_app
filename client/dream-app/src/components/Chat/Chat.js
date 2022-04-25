import React, {useState, useEffect, useRef} from "react";
import "../Homepage/homepage.scss";
import "./StartChat.scss"
import {agoraRTMInstance} from "../Homepage/Homepage";
import {
    Avatar, Grid, IconButton, Button,
    List,
    ListItem,
    ListItemAvatar, ListItemButton,
    ListItemText,
    Typography,
    TextField,
    Dialog, DialogActions, DialogContent, DialogContentText
} from "@mui/material";
import list from "../../images/person-icon-leader-icon-png.png";
import friend from "../../images/friend-pic.jpeg";
import AddIcon from '@mui/icons-material/Add';
import ChatBox from "./Chatbox";
import axios from "axios";
import {useNavigate} from "react-router-dom";


function Chat() {
    const userid = localStorage.getItem("userid");
    const email = localStorage.getItem("email");
    const nickname = localStorage.getItem("nickname");
    const [chatbox, setChatbox] = useState(false);
    const [contact, setContact] = useState(data);
    const [open, setOpen] = React.useState(false);
    const [filter, setFilter] = useState('');
    const [msgs, setMsgs] = useState([
        {
            "uid": "12333",
            "nickname": "jackie",
            "profile_photo": "",
            "content": [
                {
                    "is_remote": true,
                    "text": "hi, this is jackie",
                    "datetime": new Date(Number("1650640916668"))
                }
            ]
        },
        {
            "uid": "234555",
            "nickname": "jackie2",
            "profile_photo": "",
            "content": [
                {
                    "is_remote": true,
                    "text": "hi, this is jackie1",
                    "datetime": new Date(Number("1650640916668"))
                },
                {
                    "is_remote": true,
                    "text": "hi, this is jackie2",
                    "datetime": new Date(Number("1650640999999"))
                }
            ]
        }
    ]);
    const [updatedPeerId, setUpdatedPeerId] = useState('');

    const loadData = () => {
        axios
            .get("http://ec2-54-224-7-114.compute-1.amazonaws.com:7777/users/" + userid + "/contacts")
            .then((res) => {
                setContact(res.data);
            })
    };
    loadData();

    useEffect(async () => {
        // The callback function receiving p2p messages from remote users
        if (agoraRTMInstance !== null) {
            /**
             * Add a listener on the 'MessageFromPeer' event
             */
            agoraRTMInstance.on('MessageFromPeer', async (msg, peerId, messageProps) => {
                setMsgs((previous) => {
                    if (previous.some(chatElem => chatElem.uid === peerId)) {
                        // If the chat exists in msgs, add the new message to the content of the chat
                        if (previous.find(c => c.uid === peerId).content.some(cc => cc.datetime.getTime() === messageProps.serverReceivedTs))
                            // Fix multiple events with a same message error
                            return [...previous];
                        previous.find(c => c.uid === peerId).content.push({
                            "is_remote": true,
                            "text": msg.text,
                            "datetime": new Date(messageProps.serverReceivedTs)
                        });
                        return [...previous];
                    }
                    // If the chat does not exist in msgs, add a new chat to msgs
                    const c = contact.find(c => c.uid === peerId);
                    if (c === undefined) return [...previous];
                    const nickname = c.nickname;
                    const profile_photo = "";
                    return [...previous,
                        {
                            "uid": peerId,
                            nickname,
                            profile_photo,
                            "content": [
                                {
                                    "is_remote": true,
                                    "text": msg.text,
                                    "datetime": new Date(messageProps.serverReceivedTs)
                                }
                            ]
                        }
                    ]
                })
            })
        }
    }, [contact.length])

    /**
     * Send a p2p message to remote users
     *
     * @param peerId the user id of the remote user
     * @param texts the text message to be sent
     * @returns {Promise<boolean>} true if the message is sent successfully; o.w. false
     */
    const sendPeerTextMsg = async (peerId, texts) => {
        if (agoraRTMInstance !== null && texts !== '') {
            agoraRTMInstance.sendMessageToPeer(
                {text: texts}, // An RtmMessage object.
                peerId, // The uid of the remote user.
            ).then(() => {
                return true
            });
            // Append the text message to the chat content
            setMsgs((previous) => {
                previous.find(c => c.uid === peerId).content.push({
                    "is_remote": false,
                    "text": texts,
                    "datetime": new Date()
                });
                return [...previous];
            })
        } else {
            return false;
        }
    }

    /**
     * Show the latest message summary with the content of a chat
     * If this is no message, return an empty string
     *
     * @param content the content of a chat, which is a child element in msgs
     * @returns {string|*} the summery text
     */
    const showSummary = (content) => {
        if (content.length === 0) return '';
        const text = content[content.length-1].text;
        if (text.length <= 40) return text;
        else return `${text.substr(0, 40)} ...`;
    }

    /**
     * Show the latest message time with the content of a chat
     * If this is no message, return an empty string
     *
     * @param content the content of a chat, which is a child element in msgs
     * @returns {string} the formatted time
     */
    const showFormattedTime = (content) => {
        if (content.length === 0) return '';
        const timeFormat = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', hour12: false}).format;
        const dt = content[content.length - 1].datetime;
        return timeFormat(dt);
    }

    const handleChatSelectOpen = () => {
        setOpen(true);
    };

    const handleChatSelectClose = () => {
        setOpen(false);
    };

    function getChatBoxView() {
        if (chatbox) {
            if (updatedPeerId !== '') {
                let chatElem = msgs.find(c => c.uid === updatedPeerId);
                return <ChatBox msgs={chatElem} sendMsgHandler={sendPeerTextMsg.bind(this)}/>;
            }
        }
    }

    /**
     * Start a new chat with a given peerId.
     *
     * @param peerId the user id of the remote user
     */
    const startNewChatHandler = (peerId) => {
        if (msgs.some(c => c.uid !== peerId)) {
            setMsgs((previous) => {
                const c = contact.find(c => c.uid === peerId);
                if (c === undefined) return [...previous];
                const nickname = c.nickname;
                const profile_photo = "";
                if (previous.find(c => c.uid === peerId))
                    return [...previous];
                // Add the new chat to msgs.
                return [...previous,
                    {
                        "uid": peerId,
                        nickname,
                        profile_photo,
                        "content": []
                    }
                ]
            })
        }
        handleChatSelectClose();
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
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar src={list} variant="square" sx={{width: 50, height: 50}}/>
                        </ListItemAvatar>
                        <ListItemText primary={nickname} secondary={email}/>
                    </ListItem>
                </List>

                {/* chat options section*/}
                {/* start a new chat button */}
                <ListItemButton divider={true} onClick={handleChatSelectOpen}
                                sx={{borderTop: 1, borderColor: "lightgray", height: 40}}>
                    <ListItemText secondary="Start a new chat" sx={{ml: 4}}/>
                    <IconButton edge="end" sx={{mr: 3}}> <AddIcon color={"secondary"}/> </IconButton>
                </ListItemButton>

                {/* choose friends to start a new chat */}
                <Dialog open={open} onClose={handleChatSelectClose} className="chooseDialog">
                    <DialogContent>
                        <DialogContentText className="text">
                            Choose contact to start a chat
                        </DialogContentText>
                        <TextField className="searchFriends" fullWidth label="Search"
                                   variant="outlined" value={filter}
                                   onChange={event => setFilter(event.target.value)}/>

                        <List sx={{width: '100%'}}>
                            {contact.map((row) => (
                                <div>
                                    <ListItemButton key={row.uid} onClick={() => {
                                        startNewChatHandler(row.uid)
                                    }}>
                                        <ListItem alignItems="flex-start" divider={true}>
                                            <ListItemAvatar>
                                                <Avatar src={list}/>
                                            </ListItemAvatar>
                                            <ListItemText primary={row.nickname} secondary={row.username}/>
                                        </ListItem>
                                    </ListItemButton>
                                </div>
                            ))}
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleChatSelectClose} className="cancelBtn">Cancel</Button>
                    </DialogActions>
                </Dialog>

                {/* chat list */}
                <List sx={{width: '100%'}}>
                    {msgs.map((chatElem) => (
                        <div>
                            <ListItemButton key={chatElem.uid} divider={true} onClick={() => {
                                setUpdatedPeerId(chatElem.uid);
                                setChatbox(true);
                            }} sx={{backgroundColor: chatbox === true ? '#e8e8e8' : 'white', height: 60}}>

                                {/* load profile photo of friend in chat here*/}
                                <ListItemAvatar>
                                    <Avatar variant="square" src={friend}/>
                                </ListItemAvatar>

                                {/* load friend's nickname and chat preview here*/}
                                <div>
                                    <ListItemText primary={chatElem.nickname}
                                                  secondary={showSummary(chatElem.content)}/>
                                </div>

                                {/* load latest message timestamp here */}
                                <div style={{textAlign: 'right', flex: 1}}>
                                    <Typography variant="body2" textAlign='right'
                                                style={{color: "#a1a1a1"}}>{showFormattedTime(chatElem.content)}</Typography>
                                </div>
                            </ListItemButton>
                        </div>
                    ))}
                </List>
            </Grid>

            {/* chatbox panel */}
            <Grid item xs={19}>
                {getChatBoxView()}
            </Grid>
        </Grid>
    );
}

export default Chat;
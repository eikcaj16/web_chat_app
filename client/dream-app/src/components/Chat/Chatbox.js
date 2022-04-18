import React from "react";
import {
  Stack,
  List,
  ListSubheader,
  Paper
} from "@mui/material";
import friend from "../../images/friend-pic.jpeg";
import { MessageLeft, MessageLeftNewest, MessageRight,MessageRightNewest } from "./Message";
import TextInput from "./TextInput";
// import axios from "axios";
import userself from "../../images/person-icon-leader-icon-png.png";


function ChatBox(){
  
    //handle click action
    // const userid = localStorage.getItem("userid");


    return (
        <Stack
            container
            direction="column"
            justifyItems="center"
            alignItems="left"
            sx={{ height: '100%' }}>

            <Paper elevation={0} sx={{overflowY: 'scroll', height: "480px", width:"99%", borderRadius:5}}>
                <List sx={{width: "100%", p:0}}>
                    {/* render friend's nickname */}
                    <ListSubheader 
                        sx={{borderBottom: 1, borderColor: 'grey.300', textAlign:"center", fontSize:20}}
                        color="primary">
                        Friend's Nickname</ListSubheader>
                    {/* load message list here */}
                    <MessageRight 
                        message="sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                        timestamp="18:53"
                    />
                    <MessageRightNewest 
                        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                        timestamp="18:57"
                        photoURL={userself}
                    />
                    <MessageLeft 
                        message="Nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi.Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                        timestamp="18:59"
                    />
                    <MessageLeft 
                        message="Ut tortor pretium viverra suspendisse potenti nullam."
                        timestamp="19:01"
                    />
                    <MessageLeftNewest 
                        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                        timestamp="19:03"
                        photoURL={friend}
                    />
                    <MessageRight 
                        message="sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                        timestamp="19:10"
                    />
                    <MessageRightNewest 
                        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit.Ut tortor pretium viverra suspendisse potenti nullam."
                        timestamp="19:17"
                        photoURL={userself}
                    />
                    <MessageLeft 
                        message="Ut tortor pretium viverra suspendisse potenti nullam."
                        timestamp="19:21"
                    />
                    <MessageLeftNewest 
                        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                        timestamp="19:23"
                        photoURL={friend}
                    />
                </List>
            </Paper>
            
            <TextInput />
               
        </Stack>
    );
}

export default ChatBox;
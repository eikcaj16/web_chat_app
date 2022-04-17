import React, { useState } from "react";
import {
  Stack,
  List,
  ListSubheader,
  Paper
} from "@mui/material";
import friend from "../../images/friend-pic.jpeg";
import { MessageLeft, MessageLeftNewest, MessageRight,MessageRightNewest } from "./Message";
import TextInput from "./TextInput";
import axios from "axios";


function ChatBox(){
  
    //handle click action
    const userid = localStorage.getItem("userid");


    return (
        <Stack
            container
            direction="column"
            justifyItems="center"
            alignItems="left"
            sx={{ height: '100%' }}>

            {/* <List>
                <ListItem  alignItems="flex-start" sx={{borderBottom: 1, borderColor: 'grey.300', height:60,pb:0}}>
                    <ListItemAvatar>
                        <Avatar  variant="square" src={friend}></Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Nickname" primaryTypographyProps={{textAlign:"center"}}/>
                </ListItem>
            </List> */}

            <Paper elevation={0} sx={{overflowY: 'scroll', height: "calc( 100% - 300px )", width:"99%", borderRadius:5}}>
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
                        photoURL=""
                    />
                    <MessageLeft 
                        message="Nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi."
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
                        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                        timestamp="19:17"
                        photoURL=""
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
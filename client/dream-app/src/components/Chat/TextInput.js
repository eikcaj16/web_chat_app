import React, { useState } from 'react';
import { 
    Box,
    FilledInput,
    IconButton,
    FormControl,
    Zoom
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import FolderIcon from '@mui/icons-material/Folder';
import ImageIcon from '@mui/icons-material/Image';

import { styled } from '@mui/material/styles';
const Input = styled('input')({
  display: 'none',
});

export default function TextInput(props) {
    const [isMouseOver, setMouseOver] = useState(false);
    const [textMsg, setTextMsg] = useState('');

    function handleMouseOver(){
        setMouseOver(true);
    }

    function handleMouseOut(){
        setMouseOver(false);
    }

    /**
     * Send p2p message to a remote user
     *
     * @param msg the text message
     */
    const sendPeerTextMsg = (msg) => {
        const sendMsgHandler = props.sendMsgHandler;
        sendMsgHandler(msg);
        setTextMsg(() => '');
    }

    /**
     * A handler that update the inputted text in the text field
     *
     * @param e event
     */
    const updateTextMsgHandler = (e) => setTextMsg(
        e.target.value
    )

    // send image to a remote user


      /**
     * Send p2p image to a remote user
     *
     * @param image the image message
     */
    const [imageMsg, setImageMsg] = useState('');
    const sendPeerImageMsg = (image) => {
        const sendImageMsgHandler = props.sendImageMsgHandler;
        sendImageMsgHandler(image);
        setImageMsg(() => '');
    }



  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt:0.5, ml:1.7}}>
        {/* send file button */}
        <Zoom in={!isMouseOver}>
          <label htmlFor="contained-button-file">
            <Input id="contained-button-file" multiple type="file" />
            <IconButton aria-label="Folder" sx={{display: isMouseOver? "none" : "flex"}} component="span"  >
                <FolderIcon fontSize='medium' color={"primary"} />
            </IconButton>
          </label>
        </Zoom>

        {/* send image button */}
        <Zoom in={!isMouseOver}>
          <label htmlFor="icon-button-file">
            <Input accept="image/*" id="icon-button-file" type="file" />
            <IconButton aria-label="Image" sx={{display: isMouseOver? "none" : "flex"}} component="span" onClick={() => {sendPeerImageMsg(imageMsg)}}>
                <ImageIcon fontSize='medium' color={"primary"}/>
            </IconButton>
          </label>
        </Zoom>




        {/* Text input area */}
        <FormControl onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <FilledInput
                aria-label = "send"
                hiddenLabel = {true}
                placeholder="text here"
                value={textMsg}
                disableUnderline = {true}
                sx={{width:isMouseOver?607:515, height:40, borderRadius:20, fontSize:17}}
                onChange={updateTextMsgHandler}
            />
        </FormControl>

        {/* send text button */}
        <IconButton aria-label="Send">
            <SendIcon fontSize='medium' color={"primary"} onClick={() => {sendPeerTextMsg(textMsg)}}/>
        </IconButton>

    </Box>
  );
}
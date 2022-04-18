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

export default function TextInput() {
    const [isMouseOver, setMouseOver] = useState(false);

    function handleMouseOver(){
        setMouseOver(true);
    }

    function handleMouseOut(){
        setMouseOver(false);
    }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt:0.5, ml:1.7}}>
        {/* send file button */}
        <Zoom in={!isMouseOver}>
            <IconButton aria-label="Folder" sx={{display: isMouseOver? "none" : "flex"}}>
                <FolderIcon fontSize='medium' color={"primary"}/>
            </IconButton>
        </Zoom>

        {/* send image button */}
        <Zoom in={!isMouseOver}>
            <IconButton aria-label="Image" sx={{display: isMouseOver? "none" : "flex"}}>
                <ImageIcon fontSize='medium' color={"primary"}/>
            </IconButton>
        </Zoom>

        {/* Text input area */}
        <FormControl onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <FilledInput
                aria-label = "send"
                hiddenLabel = {true}
                placeholder="text here"
                disableUnderline = {true}
                sx={{width:isMouseOver?607:515, height:40, borderRadius:20, fontSize:17}}
            />
        </FormControl>

        {/* send text button */}
        <IconButton aria-label="Send">
            <SendIcon fontSize='medium' color={"primary"}/>
        </IconButton>

    </Box>
  );
}
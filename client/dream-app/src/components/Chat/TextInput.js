import * as React from 'react';
import { 
    Box,
    FilledInput,
    IconButton
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import FolderIcon from '@mui/icons-material/Folder';
import ImageIcon from '@mui/icons-material/Image';

export default function TextInput() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt:0.5, ml:1.7}}>
        {/* send file button */}
        <IconButton aria-label="Folder">
            <FolderIcon fontSize='medium' color={"primary"}/>
        </IconButton>

        {/* send image button */}
        <IconButton aria-label="Image">
            <ImageIcon fontSize='medium' color={"primary"}/>
        </IconButton>

        {/* Text input area */}
        <FilledInput
            aria-label = "send"
            hiddenLabel = {true}
            placeholder="text here"
            disableUnderline = {true}
            sx={{width:515, height:40, borderRadius:20, fontSize:17}}
            inputProps={{lineHeight: "1"}}
        />

        {/* send text button */}
        <IconButton aria-label="Send">
            <SendIcon fontSize='medium' color={"primary"}/>
        </IconButton>

    </Box>
  );
}
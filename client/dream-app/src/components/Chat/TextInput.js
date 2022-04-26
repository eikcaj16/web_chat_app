import React, { useState } from "react";
import { Box, FilledInput, IconButton, FormControl, Zoom } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import FolderIcon from "@mui/icons-material/Folder";
import ImageIcon from "@mui/icons-material/Image";

import { styled } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});

export default function TextInput(props) {
  const [isMouseOver, setMouseOver] = useState(false);
  const [textMsg, setTextMsg] = useState("");

  function handleMouseOver() {
    setMouseOver(true);
  }

  function handleMouseOut() {
    setMouseOver(false);
  }

  /**
   * Send p2p message to a remote user
   *
   * @param type
   * @param data the text message
   */
  const sendPeerMsg = (type, data) => {
    const sendMsgHandler = props.sendMsgHandler;
    if (type === "TEXT") {
      sendMsgHandler({ type, text: data });
      setTextMsg(() => "");
    } else if (type === "IMAGE" || type === "FILE") {
      sendMsgHandler({ type, blob: data.blob, filename: data.filename });
    }
  };

  /**
   * A handler that update the inputted text in the text field
   *
   * @param e event
   */
  const updateTextMsgHandler = (e) => setTextMsg(e.target.value);

  const sendPeerImageMsg = (e) => {
    sendPeerMsg("IMAGE", { blob: e.target.files[0] });
    e.target.key = Math.random();
  };

  const sendPeerFileMsg = (e) => {
    sendPeerMsg("FILE", {
      blob: e.target.files[0],
      filename: e.target.files[0].name,
    });
    e.target.key = Math.random();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        mt: 0.5,
        ml: 1.7,
      }}
    >
      {/* send file button */}
      <Zoom in={!isMouseOver}>
        <label htmlFor="contained-button-file">
          <Input
            id="contained-button-file"
            multiple
            type="file"
            key={Math.random()}
            onChange={(e) => {
              sendPeerFileMsg(e);
            }}
          />
          <IconButton
            aria-label="Folder"
            sx={{ display: isMouseOver ? "none" : "flex" }}
            component="span"
          >
            <FolderIcon fontSize="medium" color={"primary"} />
          </IconButton>
        </label>
      </Zoom>

      {/* send image button */}
      <Zoom in={!isMouseOver}>
        <label htmlFor="icon-button-file">
          <Input
            accept="image/*"
            id="icon-button-file"
            type="file"
            key={Math.random()}
            onChange={(e) => {
              sendPeerImageMsg(e);
            }}
          />
          <IconButton
            aria-label="Image"
            sx={{ display: isMouseOver ? "none" : "flex" }}
            component="span"
          >
            <ImageIcon fontSize="medium" color={"primary"} />
          </IconButton>
        </label>
      </Zoom>

      {/* Text input area */}
      <FormControl onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <FilledInput
          aria-label="send"
          hiddenLabel={true}
          placeholder="text here"
          value={textMsg}
          disableUnderline={true}
          sx={{
            width: isMouseOver ? 607 : 515,
            height: 40,
            borderRadius: 20,
            fontSize: 17,
          }}
          onChange={updateTextMsgHandler}
        />
      </FormControl>

      {/* send text button */}
      <IconButton aria-label="Send">
        <SendIcon
          fontSize="medium"
          color={"primary"}
          onClick={() => {
            sendPeerMsg("TEXT", textMsg);
          }}
        />
      </IconButton>
    </Box>
  );
}

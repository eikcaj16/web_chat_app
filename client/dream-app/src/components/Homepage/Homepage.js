import "./homepage.scss";
import React, { useState, useEffect } from "react";
import Contact from "../Contact/contact";
import list from "../../images/person-lines-fill.svg";
import settingIcon from "../../images/gear-fill.svg";
import chatIcon from "../../images/chat-icon.svg";
import Setting from "../SettingPage/Setting";
import Chat from "../Chat/Chat";
import { Box, Button, Grid } from "@mui/material";
import AgoraRTM from "agora-rtm-sdk";

export let agoraRTMInstance = null;

/**
 * Initialize the Agora Real-time Message SDK and login with a user id
 *
 * @param appId the appId provided by Agora
 * @param userId a user id which is unique
 * @returns {Promise<void>}
 */
const agora_rtm_init = async (appId, userId) => {
  if (agoraRTMInstance === null) {
    agoraRTMInstance = AgoraRTM.createInstance(appId, {
      enableLogUpload: false,
    });
    await agoraRTMInstance.login({ uid: userId });
  }
};

function Homepage() {
  useEffect(() => {
    agora_rtm_init(
      localStorage.getItem("agora_app_id"),
      localStorage.getItem("userid")
    ).then(() => {
      console.log("Agora RTM instance created and logged in");
    });
  }, []);

  //get view of three tabs
  function getView() {
    switch (option) {
      case 1:
        return <Contact />;
      case 2:
        return <Chat />;
      case 3:
        return <Setting />;

      default:
        return <Contact />;
    }
  }

  const [option, setOption] = useState(1);

  return (
    <div className="mainform">
      <Grid
        container
        direction="row"
        alignItems="stretch"
        sx={{ height: "100%" }}
      >
        <Grid item xs={1}>
          <Box height={80} />

          {/* contact tab button */}
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 0.2 }}
            color={option === 1 ? "secondary" : "primary"}
            onClick={() => {
              setOption(1);
            }}
          >
            <img height={40} src={list} alt="" />
          </Button>

          {/* chat tab button */}
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 0.2 }}
            color={option === 2 ? "secondary" : "primary"}
            onClick={() => {
              setOption(2);
            }}
          >
            <img height={40} src={chatIcon} alt="" />
          </Button>

          {/* setting tab button */}
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 0.2 }}
            color={option === 3 ? "secondary" : "primary"}
            onClick={() => {
              setOption(3);
            }}
          >
            <img height={40} src={settingIcon} alt="" />
          </Button>
        </Grid>
        <Grid item xs={11}>
          {getView()}
        </Grid>
      </Grid>
    </div>
  );
}

export default Homepage;

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
import axios from "axios";

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
  const userid = localStorage.getItem("userid");
  const [contact, setContact] = useState([]);
  const [msgs, setMsgs] = useState([
    {
      uid: "12333",
      nickname: "jackie",
      profile_photo: "",
      content: [
        {
          type: "TEXT",
          is_remote: true,
          text: "hi, this is jackie",
          datetime: new Date(Number("1650640916668")),
        },
      ],
    },
    {
      uid: "234555",
      nickname: "jackie2",
      profile_photo: "",
      content: [
        {
          type: "TEXT",
          is_remote: true,
          text: "hi, this is jackie1",
          datetime: new Date(Number("1650640916668")),
        },
        {
          type: "TEXT",
          is_remote: true,
          text: "hi, this is jackie2",
          datetime: new Date(Number("1650640999999")),
        },
      ],
    },
  ]);

  const loadData = () => {
    axios
      .get(
        "http://ec2-3-237-83-59.compute-1.amazonaws.com:7777/users/" +
          userid +
          "/contacts"
      )
      .then((res) => {
        let ret = [];
        res.data.forEach((c) => {
          ret.push({
            ...c,
            profile_photo: `https://info6150-msg-app.s3.amazonaws.com/profile_img/${
              c.uid
            }?${Math.random()}`,
          });
        });
        setContact(ret);
      });
  };

  const updateContact = () => {
    loadData();
    setContact((previous) => {
      previous.forEach((c) => {
        c.profile_photo = `https://info6150-msg-app.s3.amazonaws.com/profile_img/${
          c.uid
        }?${Math.random()}`;
      });
      return [...previous];
    });
  };

  const setContacts = (contacts) => {
    setContact(contacts);
  };

  /**
   * Start a new chat with a given peerId
   *
   * @param peerId the user id of the remote user
   */
  const startNewChat = (peerId) => {
    if (msgs.some((c) => c.uid !== peerId)) {
      setMsgs((previous) => {
        const c = contact.find((c) => c.uid === peerId);
        if (c === undefined) return [...previous];
        const nickname = c.nickname;
        const profile_photo = c.profile_photo;
        if (previous.find((c) => c.uid === peerId)) return [...previous];
        // Add the new chat to msgs.
        return [
          ...previous,
          {
            uid: peerId,
            nickname,
            profile_photo,
            content: [],
          },
        ];
      });
    }
  }

  /**
   * Send a p2p message to remote users
   *
   * @param peerId the user id of the remote user
   * @param data the text message to be sent
   * @returns {Promise<boolean>} true if the message is sent successfully; o.w. false
   */
  const sendPeerMsg = async (peerId, data) => {
    if (agoraRTMInstance !== null && data !== undefined) {
      let filename = "";
      let sent = false;
      if (data.type === "TEXT") {
        if (data.text !== "") {
          agoraRTMInstance
            .sendMessageToPeer(
              { text: data.text }, // An RtmMessage object.
              peerId // The uid of the remote user.
            )
            .then(() => {
              return true;
            });
          sent = true;
        }
      } else if (data.type === "IMAGE") {
        const mediaMessage =
          await agoraRTMInstance.createMediaMessageByUploading(data.blob, {
            messageType: "IMAGE",
          });
        filename = mediaMessage.fileName;
        agoraRTMInstance
          .sendMessageToPeer(
            mediaMessage,
            peerId // The uid of the remote user.
          )
          .then(() => {
            return true;
          });
        sent = true;
      } else if (data.type === "FILE") {
        const mediaMessage =
          await agoraRTMInstance.createMediaMessageByUploading(data.blob, {
            messageType: "FILE",
          });
        mediaMessage.fileName = data.filename;
        filename = mediaMessage.fileName;
        agoraRTMInstance
          .sendMessageToPeer(
            mediaMessage,
            peerId // The uid of the remote user.
          )
          .then(() => {
            return true;
          });
        sent = true;
      }
      if (sent) {
        // Append the text message to the chat content
        setMsgs((previous) => {
          previous
            .find((c) => c.uid === peerId)
            .content.push({
            type: data.type,
            is_remote: false,
            text: data.text,
            blob: data.blob,
            filename: filename,
            datetime: new Date(),
          });
          return [...previous];
        });
      }
    } else {
      return false;
    }
  };

  useEffect(async () => {
    agora_rtm_init(
      localStorage.getItem("agora_app_id"),
      localStorage.getItem("userid")
    ).then(() => {
      console.log("Agora RTM instance created and logged in");
    });

    loadData();

    // The callback function receiving p2p messages from remote users
    if (agoraRTMInstance !== null) {
      /**
       * Add a listener on the 'MessageFromPeer' event
       */
      agoraRTMInstance.on(
        "MessageFromPeer",
        async (msg, peerId, messageProps) => {
          let type1 = "TEXT";
          let text1 = null;
          let blob = null;
          let filename1 = null;
          switch (msg.messageType) {
            case "TEXT":
              text1 = msg.text;
              break;
            case "IMAGE":
              type1 = "IMAGE";
              blob = await agoraRTMInstance.downloadMedia(msg.mediaId);
              filename1 = msg.fileName;
              break;
            case "FILE":
              type1 = "FILE";
              blob = await agoraRTMInstance.downloadMedia(msg.mediaId);
              filename1 = msg.fileName;
              break;
            default:
              break;
          }
          setMsgs((previous) => {
            if (previous.some((chatElem) => chatElem.uid === peerId)) {
              // If the chat exists in msgs, add the new message to the content of the chat
              if (
                previous
                  .find((c) => c.uid === peerId)
                  .content.some(
                  (cc) =>
                    cc.datetime.getTime() === messageProps.serverReceivedTs
                )
              )
                // Fix multiple events with a same message error
                return [...previous];
              previous.find(
                (c) => c.uid === peerId
              ).profile_photo = `https://info6150-msg-app.s3.amazonaws.com/profile_img/${peerId}?${Math.random()}`;
              previous
                .find((c) => c.uid === peerId)
                .content.push({
                type: type1,
                is_remote: true,
                text: text1,
                blob,
                filename: filename1,
                datetime: new Date(messageProps.serverReceivedTs),
              });
              return [...previous];
            }
            // If the chat does not exist in msgs, add a new chat to msgs
            const c = contact.find((c) => c.uid === peerId);
            if (c === undefined) return [...previous];
            const nickname = c.nickname;
            const profile_photo = `https://info6150-msg-app.s3.amazonaws.com/profile_img/${peerId}?${Math.random()}`;
            return [
              ...previous,
              {
                uid: peerId,
                nickname,
                profile_photo,
                content: [
                  {
                    type: type1,
                    is_remote: true,
                    text: text1,
                    blob,
                    filename: filename1,
                    datetime: new Date(messageProps.serverReceivedTs),
                  },
                ],
              },
            ];
          });
        }
      );
    }
  }, [contact.length]);

  //get view of three tabs
  function getView() {
    switch (option) {
      case 1:
        return (
          <Chat
            contact={contact}
            msgs={msgs}
            updateContactHandler={updateContact.bind(this)}
            startNewChatHandler={startNewChat.bind(this)}
            sendPeerMsgHandler={sendPeerMsg.bind(this)}
          />
        );
      case 2:
        return <Contact/>;
      case 3:
        return <Setting />;

      default:
        return (
          <Chat
            contact={contact}
            msgs={msgs}
            updateContactHandler={updateContact.bind(this)}
            startNewChatHandler={startNewChat.bind(this)}
            sendPeerMsgHandler={sendPeerMsg.bind(this)}
          />
        );
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
            <img height={40} src={chatIcon} alt="" />
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
            <img height={40} src={list} alt="" />
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

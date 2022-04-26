import React from "react";
import {
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import ThemeOptions from "../../Theme";
import noPhoto from "../../images/no_photo.jpg";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

//The Newest Message from chat friend(s) with photo
export const MessageLeftNewest = (props) => {
  const message = props.message ? props.message : "failed to load message";
  const timestamp = props.timestamp ? props.timestamp : "xx:xx";
  const photoURL = props.photoURL ? props.photoURL : "";
  return (
    <ListItem sx={{ pt: 0, pb: 0, width: "50%" }}>
      <ListItemAvatar>
        <Avatar variant="square" src={photoURL} />
      </ListItemAvatar>
      <ListItemText
        primary={message}
        primaryTypographyProps={{ fontSize: 17 }}
        secondary={timestamp}
        secondaryTypographyProps={{ fontSize: 10 }}
        sx={{ bgcolor: "grey.300", borderRadius: 2, px: 1 }}
      />
    </ListItem>
  );
};

//Messages from chat friend(s) without photo
export const MessageLeft = (props) => {
  const message = props.message ? props.message : "failed to load message";
  const timestamp = props.timestamp ? props.timestamp : "xx:xx";
  return (
    <ListItem sx={{ pt: 0, pb: 0, pl: 9, width: "50%" }}>
      <ListItemText
        primary={message}
        primaryTypographyProps={{ fontSize: 17 }}
        secondary={timestamp}
        secondaryTypographyProps={{ fontSize: 10 }}
        sx={{ bgcolor: "grey.300", borderRadius: 2, px: 1 }}
      />
    </ListItem>
  );
};

//The newest Message from userself with photo
export const MessageRightNewest = (props) => {
  const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? props.timestamp : "";
  const photoURL = props.photoURL ? props.photoURL : "dummy.js";

  return (
    <ListItem sx={{ pt: 0, pb: 0, width: "50%", ml: 42 }}>
      <ListItemText
        primary={message}
        primaryTypographyProps={{
          fontSize: 17,
          textAlign: "left",
          color: ThemeOptions.palette.white.main,
        }}
        secondary={timestamp}
        secondaryTypographyProps={{
          fontSize: 10,
          textAlign: "right",
          color: ThemeOptions.palette.white.main,
        }}
        sx={{
          bgcolor: ThemeOptions.palette.primary.main,
          borderRadius: 2,
          px: 1,
        }}
      />
      <ListItemAvatar sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Avatar variant="square" src={photoURL}></Avatar>
      </ListItemAvatar>
    </ListItem>
  );
};

//Messages from chat friend(s) without photo
export const MessageRight = (props) => {
  const message = props.message ? props.message : "failed to load message";
  const timestamp = props.timestamp ? props.timestamp : "xx:xx";

  return (
    <ListItem sx={{ pt: 0, pb: 0, pr: 9, width: "50%", ml: 42 }}>
      <ListItemText
        primary={message}
        primaryTypographyProps={{
          fontSize: 17,
          textAlign: "left",
          color: ThemeOptions.palette.white.main,
        }}
        secondary={timestamp}
        secondaryTypographyProps={{
          fontSize: 10,
          textAlign: "right",
          color: ThemeOptions.palette.white.main,
        }}
        sx={{
          bgcolor: ThemeOptions.palette.primary.main,
          borderRadius: 2,
          px: 1,
        }}
      />
    </ListItem>
  );
};

//The Newest Image from chat friend(s) with photo
export const ImageLeftNewest = (props) => {
  const timestamp = props.timestamp ? props.timestamp : "xx:xx";
  const photoURL = props.photoURL ? props.photoURL : "";
  const image = props.image ? props.image : noPhoto;

  return (
    <ListItem sx={{ pt: 0, pb: 0, width: "50%" }}>
      <ListItemAvatar>
        <Avatar variant="square" src={photoURL} />
      </ListItemAvatar>
      <Card style={{ maxWidth: 200, margin: 15 }}>
        <CardMedia
          style={{
            width: "auto",
            maxHeight: "200px",
          }}
          component="img"
          image={image}
        />
      </Card>
      <Typography variant="body2" color="text.secondary">
        {timestamp}
      </Typography>
    </ListItem>
  );
};

//The newest Image from userself with photo
export const ImageRightNewest = (props) => {
  const timestamp = props.timestamp ? props.timestamp : "xx:xx";
  const photoURL = props.photoURL ? props.photoURL : "";
  const image = props.image ? props.image : noPhoto;

  return (
    <ListItem sx={{ pt: 0, pb: 0, width: "50%", ml: 42 }}>
      <Typography variant="body2" color="text.secondary">
        {timestamp}
      </Typography>
      <Card style={{ maxWidth: 200, margin: 15 }}>
        <CardMedia
          style={{
            width: "auto",
            maxHeight: "200px",
          }}
          component="img"
          image={image}
        />
      </Card>
      <ListItemAvatar sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Avatar variant="square" src={photoURL}></Avatar>
      </ListItemAvatar>
    </ListItem>
  );
};

//The Newest Image from chat friend(s) with photo
export const ImageLeft = (props) => {
  const timestamp = props.timestamp ? props.timestamp : "xx:xx";
  const image = props.image ? props.image : noPhoto;

  return (
    <ListItem sx={{ pt: 0, pb: 0, width: "50%" }}>
      <Card style={{ maxWidth: 200, margin: 15 }}>
        <CardMedia
          style={{
            width: "auto",
            maxHeight: "200px",
          }}
          component="img"
          image={image}
        />
      </Card>
      <Typography variant="body2" color="text.secondary">
        {timestamp}
      </Typography>
    </ListItem>
  );
};

//The newest Image from userself with photo
export const ImageRight = (props) => {
  const timestamp = props.timestamp ? props.timestamp : "xx:xx";
  const image = props.image ? props.image : noPhoto;

  return (
    <ListItem sx={{ pt: 0, pb: 0, width: "50%", ml: 42 }}>
      <Typography variant="body2" color="text.secondary">
        {timestamp}
      </Typography>
      <Card style={{ maxWidth: 200, margin: 15 }}>
        <CardMedia
          style={{
            width: "auto",
            maxHeight: "200px",
          }}
          component="img"
          image={image}
        />
      </Card>
    </ListItem>
  );
};

import React from "react";
import {
    Avatar,
    ListItem,
    ListItemText,
    ListItemAvatar
  } from "@mui/material";
import ThemeOptions from "../../Theme";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';



//The Newest Message from chat friend(s) with photo
export const MessageLeftNewest = (props) => {
    const message = props.message ? props.message : "failed to load message";
    const timestamp = props.timestamp ? props.timestamp : "xx:xx";
    const photoURL = props.photoURL ? props.photoURL : "";

  return (
      <ListItem sx={{pt:0, pb:0, width:"50%"}}>
        <ListItemAvatar>
            <Avatar  variant="square" src={photoURL}></Avatar>    
        </ListItemAvatar>
        <ListItemText
          primary={message}
          primaryTypographyProps={{fontSize:17}}
          secondary={timestamp}
          secondaryTypographyProps={{fontSize:10}}
          sx={{bgcolor:"grey.300", borderRadius:2, px:1}}
        />
      </ListItem>
  );
}

//Messages from chat friend(s) without photo
export const MessageLeft=(props) =>{
    const message = props.message ? props.message : "failed to load message";
    const timestamp = props.timestamp ? props.timestamp : "xx:xx";
    return(
        <ListItem sx={{pt:0, pb:0, pl: 9, width:"50%"}}>
            <ListItemText 
            primary={message}
            primaryTypographyProps={{fontSize:17}}
            secondary={timestamp}
            secondaryTypographyProps={{fontSize:10}}
            sx={{bgcolor:"grey.300", borderRadius:2, px:1}}
            />
        </ListItem>
    );
}


//The newest Message from userself with photo
export const MessageRightNewest = (props) => {
    const message = props.message ? props.message : "no message";
    const timestamp = props.timestamp ? props.timestamp : "";
    const photoURL = props.photoURL ? props.photoURL : "dummy.js";

    return (
        <ListItem sx={{pt:0, pb:0, width:"50%",ml:42}}>
            <ListItemText
            primary={message}
            primaryTypographyProps={{fontSize:17, textAlign: "left", color:ThemeOptions.palette.white.main}}
            secondary={timestamp}
            secondaryTypographyProps={{fontSize:10, textAlign: "right", color:ThemeOptions.palette.white.main}}
            sx={{bgcolor:ThemeOptions.palette.primary.main, borderRadius:2, px:1}}
            />
            <ListItemAvatar sx={{display:'flex', justifyContent:'flex-end'}} >
                <Avatar  variant="square" src={photoURL}></Avatar>    
            </ListItemAvatar>
        </ListItem>
    );
  }
  
  //Messages from chat friend(s) without photo
  export const MessageRight = (props) => {
    const message = props.message ? props.message : "failed to load message";
    const timestamp = props.timestamp ? props.timestamp : "xx:xx";

    return (
        <ListItem sx={{pt:0, pb:0, pr:9, width:"50%", ml:42}}>
            <ListItemText
            primary={message}
            primaryTypographyProps={{fontSize:17, textAlign: "left", color:ThemeOptions.palette.white.main}}
            secondary={timestamp}
            secondaryTypographyProps={{fontSize:10, textAlign: "right", color:ThemeOptions.palette.white.main}}
            sx={{bgcolor:ThemeOptions.palette.primary.main, borderRadius:2, px:1}}
            />
        </ListItem>
    );
  }






  
 //The Newest Image from chat friend(s) with photo
export const ImageLeftNewest = (props) => {
    const photoURL = props.photoURL ? props.photoURL : "";
    const itemData = [
      {
         img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
         title: 'Breakfast',
      },
  ];

  return (
    <ImageList sx={{ width: 800, height: 200 }} cols={6} rowHeight={100}>
        <ListItemAvatar sx={{display:'flex', justifyContent:'flex-end'}} >
                <Avatar  variant="square" src={photoURL}></Avatar>    
        </ListItemAvatar>
       {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
             src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
             srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
             alt={item.title}
             loading="lazy"
            />
          </ImageListItem>
        ))}
    </ImageList>
  );
}


  //The newest Image from userself with photo
export const ImageRightNewest = (props) => {
    const photoURL = props.photoURL ? props.photoURL : "dummy.js";
     const itemData = [
      {
    img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
    title: 'Sink',
    author: 'Charles Deluvio',
      },
  ];

  return (

    <ImageList sx={{ width: 800, height: 200 }} cols={6} rowHeight={100}>
        
       {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
             src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
             srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
             alt={item.title}
             loading="lazy"
            />
          </ImageListItem>
        ))}

        <ListItemAvatar sx={{display:'flex', justifyContent:'flex-end'}} >
                <Avatar  variant="square" src={photoURL}></Avatar>    
        </ListItemAvatar>
    </ImageList>
    );
  }






import "./homepage.css";
import React, {useState} from "react";
import Contact from "./contact";
import list from "../../images/person-lines-fill.svg";
import settingIcon from "../../images/gear-fill.svg";
import Setting from "./Setting"
import {Box, Button, Grid} from "@mui/material";
function Homepage(){
  function getView() {
    switch (option) {
      case 1:
        return <Contact />
      case 2:
        return <Setting />
    }
  }
  const [option,setOption] = useState(1);
  return (<div className="mainform" >
    <Grid
        container
        direction="row"
        alignItems="stretch"
        sx={{ height: '100%' }}
    >
      <Grid item xs={1}>
        <Box height={80}/>
      <Button fullWidth variant="contained" color={option===1 ? "secondary":"primary"}
            onClick={()=>{
              setOption(1)}}><img height={40} src={list}/></Button>
      <Button fullWidth variant="contained" color={option===2 ? "secondary":"primary"}
    onClick={() => {
      setOption(2)}}><img  height={40} src={settingIcon}/></Button>
      </Grid>
      <Grid item xs={11}>
    {getView()}
      </Grid>
    </Grid>
  </div>)
}

export default Homepage
import './App.css';
import React from "react";
// import {Button} from "@mui/material";
import background from "./images/beijingtupia101330.jpg";
import SignInForm from './components/SignInForm/SignInForm';


class App extends React.Component{
  render() {
    return (
          <div style={{ backgroundImage: `url(${background})`}} className = "bg">
            <SignInForm />
          </div>
    );
  }
}

export default App;

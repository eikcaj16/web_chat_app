import './App.css';
import React from "react";
// import {Button} from "@mui/material";
import background from "./images/beijingtupia101330.jpg";
import SignInForm from './components/SignInForm/SignInForm';
import {BrowserRouter, Routes, Route, Router} from "react-router-dom";
import Contact from "./components/Contact/contact.js";
import Homepage from "./components/Contact/Homepage";
import StartChat from './components/StartChat/StartChat';

class App extends React.Component{
  render() {
    return (
        // <BrowserRouter>
        //   <Routes>
        //     <Route exact path="/" element={<div className = "bg"><SignInForm /></div>}/>
        //     <Route exact path="/homepage" element={<div className = "bg"> <Homepage /> </div>}/>
        //   </Routes>
        // </BrowserRouter>
        /*
          <div style={{ backgroundImage: `url(${background})`}} className = "bg">
            <SignInForm />
          </div>
         */

        <StartChat />
    );
  }
}

export default App;

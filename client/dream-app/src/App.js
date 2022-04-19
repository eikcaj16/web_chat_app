import './App.scss';
import React from "react";
// import {Button} from "@mui/material";
import SignInForm from './components/SignInForm/SignInForm';
import {BrowserRouter, Routes, Route, Router} from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";

class App extends React.Component{
  render() {
    return (
        <BrowserRouter>
          <Routes>
            <Route exact path="/index" element={<div className = "bg"><SignInForm /></div>}/>
            <Route exact path="/homepage" element={<div className = "bg"> <Homepage /> </div>}/>
          </Routes>
        </BrowserRouter>
        /*
          <div style={{ backgroundImage: `url(${background})`}} className = "bg">
            <SignInForm />
          </div>
         */

        // <StartChat />
    );
  }
}

export default App;

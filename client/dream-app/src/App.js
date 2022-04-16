import './App.scss';
import React from "react";
// import {Button} from "@mui/material";
import SignInForm from './components/SignInForm/SignInForm';
import {BrowserRouter, Routes, Route, Router} from "react-router-dom";
import Homepage from "./components/Contact/Homepage";

class App extends React.Component{
  render() {
    return (
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<div className = "bg"><SignInForm /></div>}/>
            <Route exact path="/homepage" element={<div className = "bg"> <Homepage /> </div>}/>
          </Routes>
        </BrowserRouter>
        /*
          <div style={{ backgroundImage: `url(${background})`}} className = "bg">
            <SignInForm />
          </div>
         */
    );
  }
}

export default App;

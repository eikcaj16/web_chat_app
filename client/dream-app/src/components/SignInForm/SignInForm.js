import React, { useState } from "react";
import "./SignInForm.css";
import {Button} from "@mui/material";
import background from "./images/Dream-logos_white.png";

function SignInForm(){

    const [isOldUser, setOldStatus] = useState(true);
    const [isNewUser, setNewStatus] = useState(false);
    const [headingText, setHeadingText] = useState("Sign In");   

    function handleClick_newUser(){
        setOldStatus(false);
        setNewStatus(true);
        setHeadingText("Sign Up");
    }

    function handleClick_oldUser(){
        setOldStatus(true);
        setNewStatus(false);
        setHeadingText("Sign In");
    }

    return (
    <form action="/" className="container" method="POST" >
        <h1 className="lbl h3">{headingText}</h1>

        {isNewUser && <label for="nickName" className="lbl" id="lbl-1">Nickname</label>}
        {isNewUser && <input type="text" name="nickName" id="input1" placeholder="Nick Name" required autoComplete="off" />}
        
        <label for="email" className="lbl" id="lbl-2">Email</label>
        <input type="email" name="email" id="input2" placeholder="Email" required autoComplete="off" />

        <label for="password"  className="lbl" id="lbl-3">Password</label>
        <input type="text" name="password" id="input3" placeholder="Password" required autoComplete="off"/>

        {isNewUser && <label for="re-password" className="lbl"  id="lbl-4">Confirm Password</label>}
        {isNewUser && <input type="text" name="re-password" id="input4" placeholder="Confirm Password" required autoComplete="off" />}

        <Button variant="contained" className="btn-signIn" type="submit">Submit</Button>
        {isOldUser && <Button variant="contained" className="btn-back" color={"white"} onClick={handleClick_newUser}>I don't have an account</Button>}
        {isNewUser && <Button variant="contained" className="btn-back" color={"white"} onClick={handleClick_oldUser}>I already had an account</Button>}

        <div className="logo" > 
        <img src={background} width="680px" height="680px" alt=""/>
        </div>
    </form>
    );
}

export default SignInForm;
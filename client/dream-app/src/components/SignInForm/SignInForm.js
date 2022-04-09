import React, { useState } from "react";
import "./SignInForm.css";
import {Button} from "@mui/material";
import background from "./images/Dream-logos_white.png";

function SignInForm(){

    //create new user and old user identifier
    const [isOldUser, setOldStatus] = useState(true);
    const [isNewUser, setNewStatus] = useState(false);
    const [headingText, setHeadingText] = useState("Sign In");   

    //jump to "Sign Up" form
    function handleClick_newUser(){
        setOldStatus(false);
        setNewStatus(true);
        setHeadingText("Sign Up");
    }

    //jump to "Sign In" form
    function handleClick_oldUser(){
        setOldStatus(true);
        setNewStatus(false);
        setHeadingText("Sign In");
    }

    //control submit actions
    const [inputs, setInputs] = useState({});

    //handle value change
    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
        }

    //handle click action    
    function handleSubmit(event) {
            event.preventDefault();
            //TO do: password validation for new user
            console.log(inputs);
        }

    return (
    <form action="/" className="container" method="POST" onSubmit={handleSubmit}>
        <h1 className="lbl h3">{headingText}</h1>

        {isNewUser && <label for="nickName" className="lbl" id="lbl-1">Nickname</label>}
        {isNewUser && 
            <input type="text" name="nickName" id="input1" placeholder="Nick Name" required autoComplete="off" 
            value={inputs.nickName || ""} 
            onChange={handleChange}
        />}
        
        <label for="email" className="lbl" id="lbl-2">Email</label>
        <input type="email" name="email" id="input2" placeholder="Email" required autoComplete="off" 
            value={inputs.email || ""} 
            onChange={handleChange}
            />

        <label for="password"  className="lbl" id="lbl-3">Password</label>
        <input type="text" name="password" id="input3" placeholder="Password" required autoComplete="off"
            value={inputs.password || ""} 
            onChange={handleChange}
        />

        {isNewUser && <label for="rePassword" className="lbl"  id="lbl-4">Confirm Password</label>}
        {isNewUser && <input type="text" name="rePassword" id="input4" placeholder="Confirm Password" required autoComplete="off" 
            value={inputs.rePassword || ""} 
            onChange={handleChange}
        />}

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
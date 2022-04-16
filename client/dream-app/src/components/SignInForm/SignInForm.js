import React, { useState } from "react";
import "./SignInForm.scss";
import {Button} from "@mui/material";
import background from "../../images/Dream-logos_white.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignInForm(){

    let navigate = useNavigate();
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
    const [inputs, setInputs] = useState({
        nickname: "",
        email: "",
        password: "",
        rePassword: ""
    });

    //handle value change
    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
        }

    //validate email
    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    //create the old user's schema
    const oldUser = {
        username: inputs.email,
        password: inputs.password,
        userid:""
    }


    //POST /users -create a user
    async function getOldUser() {
        await axios.post('http://localhost:7777/users/login', oldUser)
        .then((response) => {
            // console.log(response.data);
            alert("Successfully Sign In!")
            localStorage.setItem('userid',response.data.id);
            localStorage.setItem('email',oldUser.username);
            localStorage.setItem('nickname',response.data.nickname);
            // window.location.reload(false);
        })
        .catch(function (error) {
            // console.log(error);
            alert("Wrong Username/Password combination!");
        });
    }

    //handle Sign In action
    //To Do: jump to contact page
    function handleSubmit_signIn(event) {
            event.preventDefault();
            //input validation
            if(!validateEmail(inputs.email)){
                alert("Invalid Email Address!");
            }else if(inputs.password === ""){
                alert("Please enter your password!");
            }else {
                console.log(inputs);
                //connect to backend
                getOldUser();
                setInputs({
                    email: "",
                    password: ""
                });
                navigate("/homepage");
            }
        }


    //create the new user's schema
    const newUser = {
        username: inputs.email,
        nickname: inputs.nickname,
        password: inputs.password
    }

    //POST /users -create a user
    function createNewUser(){
        axios.post('http://localhost:7777/users', newUser)
        .then(response => {
            // console.log(response.data);
            alert(response.data.message)
            window.location.reload(false);
        })
        .catch(function(error) {
            // console.log(error);
            alert(error.response.data.error);
        });
    }

    //handle Sign Up action
    function handleSubmit_signUp(event) {
        event.preventDefault();
            //input validation
            if(inputs.nickname === "" || inputs.email === "" || inputs.password === "" || inputs.rePassword === ""){
                alert("Please enter your information!");
            }else if(!validateEmail(inputs.email)){
                alert("Invalid Email Address!");
            }else if(inputs.password !== inputs.rePassword){ //password validation for new user
                alert("Password doesn't match, please enter it again!");
                setInputs({
                    nickname: inputs.nickname,
                    email: inputs.email,
                    password: "",
                    rePassword: ""
                });
            }else{
                // console.log(inputs);
                createNewUser();//connect to backend
                setInputs({
                    nickname: "",
                    email: "",
                    password: "",
                    rePassword: ""
                });
            }
    }

    return (
    <form className="container">
        <h1 className="lbl h3">{headingText}</h1>

        {isNewUser && <label for="nickname" className="lbl" id="lbl-1">Nickname</label>}
        {isNewUser &&
            <input className="SigninInput" type="text" name="nickname" id="input1" placeholder="Nick Name" required autoComplete="off"
            value={inputs.nickname || ""}
            onChange={handleChange}
        />}

        <label for="email" className="lbl" id="lbl-2">Email</label>
        <input className="SigninInput" type="email" name="email" id="input2" placeholder="Email" required autoComplete="off"
            value={inputs.email || ""}
            onChange={handleChange}
            />

        <label for="password"  className="lbl" id="lbl-3">Password</label>
        <input className="SigninInput" type="text" name="password" id="input3" placeholder="Password" required autoComplete="off"
            value={inputs.password || ""}
            onChange={handleChange}
        />

        {isNewUser && <label for="rePassword" className="lbl"  id="lbl-4">Confirm Password</label>}
        {isNewUser && <input className="SigninInput" type="text" name="rePassword" id="input4" placeholder="Confirm Password" required autoComplete="off"
            value={inputs.rePassword || ""}
            onChange={handleChange}
        />}

        {isOldUser && <Button variant="contained" className="btn-signIn" type="submit" onClick={handleSubmit_signIn}>Sign In</Button>}
        {isNewUser && <Button variant="contained" className="btn-signIn" type="submit" color={"secondary"} onClick={handleSubmit_signUp}>Sign Up</Button>}
        {isOldUser && <Button variant="contained" className="btn-back" color={"white"} onClick={handleClick_newUser}>I don't have an account</Button>}
        {isNewUser && <Button variant="contained" className="btn-back" color={"white"} onClick={handleClick_oldUser}>I already had an account</Button>}

        <div className="logo" >
        <img src={background} width="680px" height="680px" alt=""/>
        </div>
    </form>
    );
}

export default SignInForm;
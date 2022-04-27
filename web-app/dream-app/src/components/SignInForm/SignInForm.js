import React, { useState } from "react";
import "./SignInForm.scss";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import background from "../../images/Dream-logos_white.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DialogContentText from "@mui/material/DialogContentText";

function SignInForm() {
  let navigate = useNavigate();
  //create new user and old user identifier
  const [isOldUser, setOldStatus] = useState(true);
  const [isNewUser, setNewStatus] = useState(false);
  const [headingText, setHeadingText] = useState("Sign In");

  const [dialogText, setDialogText] = useState("");
  const [open, setOpen] = useState(false);

  //jump to "Sign Up" form
  function handleClick_newUser() {
    setOldStatus(false);
    setNewStatus(true);
    setHeadingText("Sign Up");
  }

  function handleClose() {
    setOpen(false);
  }
  //jump to "Sign In" form
  function handleClick_oldUser() {
    setOldStatus(true);
    setNewStatus(false);
    setHeadingText("Sign In");
  }

  //control submit actions
  const [inputs, setInputs] = useState({
    nickname: "",
    email: "",
    password: "",
    rePassword: "",
  });

  //handle value change
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
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
    userid: "",
  };

  //POST /users -create a user
  async function getOldUser() {
    await axios
      .post(
        "http://ec2-3-237-83-59.compute-1.amazonaws.com:7777/users/login",
        oldUser
      )
      .then((response) => {
        // console.log(response.data);
        localStorage.setItem("userid", response.data.id);
        localStorage.setItem("email", oldUser.username);
        localStorage.setItem("nickname", response.data.nickname);
        localStorage.setItem("agora_app_id", response.data.appid);
        getImage();
        navigate("/homepage");
      })
      .catch(function (error) {
        // console.log(error);
        setDialogText("Wrong Username/Password combination!");
        setOpen(true);
      });
  }
  //In progress
  function getImage() {
    axios
      .get(
        "http://ec2-3-237-83-59.compute-1.amazonaws.com:7777/users/" +
          localStorage.getItem("userid") +
          "/pic"
      )
      .then((response) => {
        localStorage.setItem("image", response.data.img_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //handle Sign In action
  //To Do: jump to contact page
  function handleSubmit_signIn(event) {
    event.preventDefault();
    //input validation
    if (!validateEmail(inputs.email)) {
      setDialogText("Invalid Email Address!");
      setOpen(true);
    } else if (inputs.password === "") {
      setDialogText("Please enter your password!");
      setOpen(true);
    } else {
      //connect to backend
      getOldUser();
      setInputs({
        email: "",
        password: "",
      });
    }
  }

  //create the new user's schema
  const newUser = {
    username: inputs.email,
    nickname: inputs.nickname,
    password: inputs.password,
  };

  //POST /users -create a user
  function createNewUser() {
    axios
      .post(
        "http://ec2-3-237-83-59.compute-1.amazonaws.com:7777/users",
        newUser
      )
      .then((response) => {
        // console.log(response.data);
        setDialogText(response.data.message);
        setOpen(true);
        window.location.reload(false);
      })
      .catch(function (error) {
        // console.log(error);
        setDialogText(error);
        setOpen(true);
      });
  }

  //handle Sign Up action
  function handleSubmit_signUp(event) {
    event.preventDefault();
    //input validation
    if (
      inputs.nickname === "" ||
      inputs.email === "" ||
      inputs.password === "" ||
      inputs.rePassword === ""
    ) {
      setDialogText("Please enter your information!");
      setOpen(true);
    } else if (!validateEmail(inputs.email)) {
      setDialogText("Invalid Email Address!");
      setOpen(true);
    } else if (inputs.password !== inputs.rePassword) {
      //password validation for new user
      setDialogText("Password doesn't match, please enter it again!");
      setOpen(true);
      setInputs({
        nickname: inputs.nickname,
        email: inputs.email,
        password: "",
        rePassword: "",
      });
    } else {
      // console.log(inputs);
      createNewUser(); //connect to backend
      setInputs({
        nickname: "",
        email: "",
        password: "",
        rePassword: "",
      });
    }
  }

  return (
    <form className="container">
      <h1 className="lbl h4">{headingText}</h1>

      {isNewUser && (
        <label for="nickname" className="lbl" id="lbl-1">
          Nickname
        </label>
      )}
      {isNewUser && (
        <input
          className="SigninInput"
          type="text"
          name="nickname"
          id="input1"
          placeholder="Nick Name"
          required
          autoComplete="off"
          value={inputs.nickname || ""}
          onChange={handleChange}
        />
      )}

      <label for="email" className="lbl" id="lbl-2">
        Email
      </label>
      <input
        className="SigninInput"
        type="email"
        name="email"
        id="input2"
        placeholder="Email"
        required
        autoComplete="off"
        value={inputs.email || ""}
        onChange={handleChange}
      />

      <label for="password" className="lbl" id="lbl-3">
        Password
      </label>
      <input
        className="SigninInput"
        type="password"
        name="password"
        id="input3"
        placeholder="Password"
        required
        autoComplete="off"
        value={inputs.password || ""}
        onChange={handleChange}
      />

      {isNewUser && (
        <label for="rePassword" className="lbl" id="lbl-4">
          Confirm Password
        </label>
      )}
      {isNewUser && (
        <input
          className="SigninInput"
          type="password"
          name="rePassword"
          id="input4"
          placeholder="Confirm Password"
          required
          autoComplete="off"
          value={inputs.rePassword || ""}
          onChange={handleChange}
        />
      )}

      {isOldUser && (
        <Button
          variant="contained"
          className="btn-signIn"
          type="submit"
          onClick={handleSubmit_signIn}
        >
          Sign In
        </Button>
      )}
      {isNewUser && (
        <Button
          variant="contained"
          className="btn-signIn"
          type="submit"
          color={"secondary"}
          onClick={handleSubmit_signUp}
        >
          Sign Up
        </Button>
      )}
      {isOldUser && (
        <Button
          variant="contained"
          className="btn-back"
          color={"white"}
          onClick={handleClick_newUser}
        >
          I don't have an account
        </Button>
      )}
      {isNewUser && (
        <Button
          variant="contained"
          className="btn-back"
          color={"white"}
          onClick={handleClick_oldUser}
        >
          I already had an account
        </Button>
      )}

      <div className="logo">
        <img src={background} width="80%" height="80%" alt="" />
        <Dialog open={open}>
          <DialogTitle>{"Alert"}</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogText}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Got it!
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </form>
  );
}

export default SignInForm;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import Input from "../AtomComponent/Input";
import getResponse from "../../utils/GetResponse";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Auth.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      const response = await getResponse(
        "post",
        `http://localhost:3000/auth/login`,
        { email: email, password: password }
      );
      localStorage.setItem("token", response.data.data["data"]);
      if (localStorage.getItem("token") != null) {
        alert("login successful");
        navigate("/");
      }
    } catch (error) {
      alert("login failed");
    }
  };
  return (
    <>
    <Navbar />
    <div className="main">
        <div className="left">
    <div className="login">
      
      <div
        
        className="login-form"
      >
        <h1>Login</h1>
        <form id="loginForm">
          <label htmlFor="login-email">
            Email:
            <Input
              type="email"
              id="login-email"
              name="login-email"
              value={email}
              changeEvent={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <br />
          <label htmlFor="login-password">
            Password:
            <Input
              type="password"
              id="login-password"
              name="login-password"
              value={password}
              changeEvent={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <br />
        </form>
        <Button variant="contained" onClick={loginUser}>Submit</Button>
      </div>
      </div>
      
    </div>
    <div className="right">
        <img src="https://image.shutterstock.com/image-vector/man-key-near-computer-account-260nw-1499141258.jpg" alt="login" />
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Login;

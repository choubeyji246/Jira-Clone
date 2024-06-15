import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@mui/material";

import getResponse from "../../utils/GetResponse";
import Input from "../AtomComponent/Input";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      const response = await getResponse(
        "post",
        "http://localhost:3000/auth/register",
        { name: name, email: email, password: password, phone: phone }
      );
      alert(response.data.data["message"]);
      navigate("/auth/login");
    } catch (error) {
        console.log(error);
      alert("Registration failed");
    }
  };
  return (
    <>
      <Navbar />
      <div className="main-register">
        <div className="left-register">
      <div  className="register-form">
        <h1 className="register-head">Register here</h1>
        <form id="registerForm">
          <label htmlFor="name">
            Name:  
            <Input
              type="text"
              id="name"
              name="name"
              value={name}
              changeEvent={(e) => setName(e.target.value)}
            />
          </label>
          <br />
          <br />

          <label htmlFor="email">
            Email:
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              changeEvent={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <br />

          <label htmlFor="password">
            Password:
            <Input
              type="Password"
              id="password"
              name="address"
              value={password}
              changeEvent={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <br />

          <label htmlFor="email">
            Contact:
            <Input
              type="text"
              id="address"
              name="address"
              value={phone}
              changeEvent={(e) => setPhone(e.target.value)}
            />
          </label>
          <br />
          <br />
        </form>
        <Button variant="contained" onClick={registerUser}>Submit</Button>
      </div>
      </div>
      <div className="right-register">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEnmF-zTtvFA-6p0UCiSYtNClc5HxRWNCv1Q&usqp=CAU" alt="register" />
      </div>
      </div>
      
      <Footer/>
    </>
  );
};

export default Register;

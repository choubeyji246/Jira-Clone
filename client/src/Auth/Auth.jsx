import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Auth = () => {
  return (
    <div className="auth">
      <Link to="/">
        <Button variant="contained">Home</Button>
      </Link>
      <Link to="/auth/login">
        <Button variant="contained">Login</Button>
      </Link>
      <Link to="/auth/register">
        <Button variant="outlined">Signup</Button>
      </Link>
    </div>
  );
};

export default Auth;

import React from 'react'
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Auth from '../../Auth/Auth';
import "./Navbar.css"

const Navbar = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        //window.location.reload();
        navigate("/")
      };
    
        return (
            <>
    <div className="navbar">
      <nav>
        <img
          src="https://images-platform.99static.com/CwCQCOs1vLwCidw1Gs28_Np_OUg=/0x64:1239x1303/500x500/top/smart/99designs-contests-attachments/90/90657/attachment_90657417"
          alt="logo"
        />
        <h3>Mr Manager</h3>
        {token ? (
          <div className="auth">
            <Link to="/">
            <Button variant='contained' onClick={()=>navigate("/dashboard")}>Dashboard</Button>
            </Link>
            <Button variant='contained' onClick={handleLogout}>LogOut</Button>
          </div>
        ) : (
          <Auth/>
        )}
      </nav>
      
    </div>
    
  </>
  );
};

export default Navbar;

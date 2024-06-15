import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"

const Footer = () => {
  return (
    <div className="footer">
      <p>&copy; 2024 Mr Man. All rights reserved.</p>
      <p>Address: 123 Main Street, Cityville</p>
      <p>Email: manager@mrmanager.com | Phone: +1 (123) 456-7890</p>
      <p>
        Follow us on:
        <Link to="/">facebook</Link>

        ,
        <Link to="/">Twitter</Link>
        ,
        <Link to="/">Instagram</Link>
      </p>
    </div>
  );
};

export default Footer;

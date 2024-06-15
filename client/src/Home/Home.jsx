import React from "react";
import Navbar from "../Component/Navbar/Navbar";
import "./Home.css";
import Footer from "../Component/Footer/Footer";
import Dashboard from "../Dashboard/Dashboard";

const Home = () => {
  const token = localStorage.getItem("token");
  return (
    <div>
      {token ? (
        <Dashboard />
      ) : (
        <div>
          <Navbar />
          <div className="main">
            <div className="left-div">
              <h2>Welcome to Mr Manager!</h2>
              <p>
                Mr Manager is your ultimate project management tool designed to
                streamline your workflow and boost productivity.
              </p>
              <h3>Key Features:</h3>
              <ul>
                <li>Task Management</li>
                <li>Team Collaboration</li>
                <li>Progress Tracking</li>
                <li>Document Sharing</li>
                <li>Deadline Reminders</li>
              </ul>
              <p>Sign up now to get started!</p>
            </div>
            <div className="right-div">
              <img
                src="https://img.freepik.com/free-vector/teem-discussing-project-kanban-board_1262-19963.jpg"
                alt="landing-page"
                className="landing-image"
              />
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Home;

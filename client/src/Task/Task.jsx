import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { Input, MenuItem, Select } from "@mui/material";
import { useLocation } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

import getResponse from "../utils/GetResponse";
import "./Task.css";
import Navbar from "../Component/Navbar/Navbar";
import Footer from "../Component/Footer/Footer";
import TaskCard from "../Component/TaskCard/TaskCard";

const Task = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tasks, setTasks] = useState([]);
  const [isTaskModal, setTaskModal] = useState(false);
  const [isMemberModal, setMemberModal] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  //console.log(location.state.projectId);
  //   console.log(location.state.members);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getResponse(
          "get",
          `http://localhost:3000/task/getAll?projectId=${location.state.projectId}`
        );
        //console.log(response);
        setTasks(response.data.data.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [location.state.projectId]);

  const handleAddMember = async () => {
    try {
      setMemberModal(false);
      const response = await getResponse(
        "post",
        "http://localhost:3000/project/addMember",
        { projectId: location.state.projectId, email: email, role: role }
      );
      console.log(response);
      navigate("/task", { state: { projectId: location.state.projectId } });
      alert("member added successfully");
    } catch (error) {
      alert("error occured during adding a member");
    }
  };
  const handleAddTask = async () => {
    try {
      setTaskModal(false);
      const response = await getResponse(
        "post",
        "http://localhost:3000/task/addTask",
        {
          projectId: location.state.projectId,
          name: name,
          description: description,
          assignedTo: { email: email, role: role },
        }
      );
      console.log(response);
      alert("Task added successfully");
      window.location.reload();
      navigate("/task", { state: { projectId: location.state.projectId } });
    } catch (error) {
      alert("error occured during adding a task");
    }
  };

  const setStateChange = (id, status) => {
    //console.log(id, status)
    setTasks((prevState) =>
      prevState.map((task) => {
        if (task._id === id) {
          return { ...task, status: status };
        } else {
          return task;
        }
      })
    );
  };

  return (
    <>
      <Navbar />
      <div className="task-page">
        <Button
          variant="contained"
          className="add-member-button"
          onClick={() => {
            setMemberModal(true);
          }}
        >
          <AddIcon></AddIcon> Add Member
        </Button>
        <Button
          variant="contained"
          className="add-task-button"
          onClick={() => {
            setTaskModal(true);
          }}
        >
          <AddIcon></AddIcon>create Task
        </Button>

        <div className="members-section">
          <h2>Members</h2>

          {location.state.members.map((member) => (
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 26 26"
              >
                <path
                  fill="currentColor"
                  d="M16.002 16.417s-1.373-.31-.723-1.679c.803-1.078 1.291-2.301 1.33-2.701c0 0 1.236-.973 1.308-2.434c.077-1.457-.271-1.525-.271-1.525c.52-1.589.688-7.553-3.141-6.841c-.638-1.251-4.638-2.232-6.503 1.101C7.073 4 6.727 6.269 7.453 8.12c-.027.138-.257-.135-.341.721c-.081.825.291 2.008.695 2.556c.176.231.457.4.654.486c0 0 .242 1.47 1.389 2.855c.264 1.099-.827 1.679-.827 1.679c-3.613.695-6.934 2.701-6.934 4.871v1.681c0 2.355 5.485 2.86 10.421 2.86c4.937 0 10.385-1.419 10.385-2.86v-1.681c0-2.17-3.282-4.176-6.893-4.871M19 24h-5v-3h5z"
                />
              </svg>
              {member.email}
            </p>
          ))}
        </div>

        <div className="columns">
          <div className="column">
            <h2>Todo</h2>
            {tasks.map(
              (task) =>
                task.status === "Todo" && (
                  <TaskCard
                    key={task.id}
                    task={task}
                    taskStateHandler={setStateChange}
                  />
                )
            )}
          </div>
          <div className="column">
            <h2>Development</h2>
            {tasks.map(
              (task) =>
                task.status === "In development" && (
                  <TaskCard
                    key={task.id}
                    task={task}
                    taskStateHandler={setStateChange}
                  />
                )
            )}
          </div>
          <div className="column">
            <h2>Testing</h2>
            {tasks.map(
              (task) =>
                task.status === "Testing" && (
                  <TaskCard
                    key={task.id}
                    task={task}
                    taskStateHandler={setStateChange}
                  />
                )
            )}
          </div>
          <div className="column">
            <h2>Production</h2>
            {tasks.map(
              (task) =>
                task.status === "Production" && (
                  <TaskCard
                    key={task.id}
                    task={task}
                    taskStateHandler={setStateChange}
                  />
                )
            )}
          </div>
        </div>
      </div>

      {/* Add member modal */}
      {isMemberModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Member</h2>
            <div>
              <label htmlFor="email">Email:</label>
              <Input
                id="email"
                placeholder="Enter email id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="role">Role:</label>
              <Select
                style={{ height: "20px" }}
                value={role}
                onChange={(event) => setRole(event.target.value)}
                variant="outlined"
              >
                <MenuItem value="Tester">Tester</MenuItem>
                <MenuItem value="Developer">Developer</MenuItem>
              </Select>
            </div>
            <Button variant="contained" onClick={handleAddMember}>
              Submit
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setMemberModal(false);
              }}
            >
              close
            </Button>
          </div>
        </div>
      )}

      {/* Add task Modal */}
      {isTaskModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create Task</h2>

            <label htmlFor="name">Name: </label>
            <Input
              id="name"
              placeholder="Enter task name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="description"></label>
            <Input
              id="description"
              placeholder="Enter decription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label htmlFor="assigned-to">Assign To: </label>
            <div>
              <label htmlFor="email">Email:</label>
              <Input
                id="email"
                placeholder="Enter email id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="role">Role:</label>
              <Select
                style={{ height: "20px" }}
                value={role}
                onChange={(event) => setRole(event.target.value)}
                variant="outlined"
              >
                <MenuItem value="Tester">Tester</MenuItem>
                <MenuItem value="Developer">Developer</MenuItem>
              </Select>
            </div>

            <Button variant="contained" onClick={handleAddTask}>
              Submit
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setTaskModal(false);
              }}
            >
              close
            </Button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Task;

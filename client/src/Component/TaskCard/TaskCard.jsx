import React, { useEffect } from 'react';
import { useState } from 'react';
import './TaskCard.css';
import {  MenuItem, Select } from '@mui/material';
import getResponse from '../../utils/GetResponse';
// import { useNavigate } from 'react-router-dom';

const TaskCard = ({ task, taskStateHandler }) => {
    const [status, setStatus] = useState("");



    const handleStatusChange = async (event) => {
        try {
            setStatus(event.target.value);
            const response=await getResponse("patch",`http://localhost:3000/task/status?taskId=${task._id}`,{ status : event.target.value });
            // navigate("/task",{state:{projectId:task.projectId}})
        //    window.location.reload()
            console.log(response);
            taskStateHandler(task._id, event.target.value);
        } catch (error) {
            alert("status updating failed")
        }
    };

    useEffect(() => {
       
    }, [status]);
 
    
  return (
    <div className="task-card">
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <h5 >Status:</h5>
        <Select style={{height:"20px"}}
          value={status}
          onChange={handleStatusChange}
          variant="outlined"
        >
          <MenuItem value="Todo">Todo</MenuItem>
          <MenuItem value="In development">In development</MenuItem>
          <MenuItem value="Testing">Testing</MenuItem>
          <MenuItem value="Production">Production</MenuItem>
        </Select>
      
    </div>
  );
};


export default TaskCard;

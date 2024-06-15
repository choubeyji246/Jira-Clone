import React, { useEffect, useState } from 'react';
import { Button, Input } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import Navbar from '../Component/Navbar/Navbar';
import Footer from '../Component/Footer/Footer';
import "./Dashboard.css";
import getResponse from '../utils/GetResponse';
import Card from '../Component/Card/Card';

const Dashboard = () => {
    
  const [projects, setProjects] = useState([]);
  const [projectModal, setProjectModal] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getResponse("get", "http://localhost:3000/project/getAll");
        setProjects(response.data.data.data);
      } catch (error) {
        alert("Data not found");
      }
    };
    fetchData();
  }, []);

  const handleCreateProject = async () => {
    try {
      const response = await getResponse("post", "http://localhost:3000/project/addProject", {
        title: projectName,
        description: projectDescription
      });
      console.log(response);
      setProjectModal(false);
      window.location.reload();
    } catch (error) {
        console.log(error);
      alert("Failed creating project");
    }
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <Button variant='outlined' className="create-project-button" onClick={() => { setProjectModal(true) }}>
          <AddIcon /> Create Project
        </Button>
        {projects.map(project => (
          <Card key={project.id} project={project}  />
        ))}
      </div>
      {projectModal && 
        <div className="modal">
          <div className="modal-content">
            <h2>Create New Project</h2>
            <div>
              <label htmlFor="projectName">Title:</label>
              <Input
                id="projectName"
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="projectDescription">Description:</label>
              <Input
                id="projectDescription"
                placeholder="Project Description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
            </div>
            <Button variant='contained' onClick={handleCreateProject}>Submit</Button>
            <Button variant='contained' onClick={()=>{setProjectModal(false)}}>close</Button>
          </div>
        </div>
      }
      <Footer />
    </>
  );
};

export default Dashboard;

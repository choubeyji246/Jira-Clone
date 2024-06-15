import React from 'react';
import { useNavigate } from 'react-router-dom';


const Card = ({ project }) => {
    const navigate = useNavigate();
    //console.log(project.members);
  return (
    <div className="card" onClick={()=>{navigate("/task", { state: {projectId:project._id, members:project.members} })}}>
        <img src="https://s3-ap-south-1.amazonaws.com/static.awfis.com/wp-content/uploads/2017/07/07184649/ProjectManagement.jpg" alt="peoject" />
      <h3>{project.title}</h3>
    </div>
  );
};

export default Card;

import React, { useState, useEffect } from "react";
import "../styles/css/LeftNavbar.css";
import { Nav, Container, Button } from "react-bootstrap";
import TaskList from "./TaskList";
import axios from "axios";
const jwtToken = localStorage.getItem("jwtToken");

const LeftNavigation = ({ onButtonClick }) => {
  const userRole = localStorage.getItem('user_role');
  const userName = localStorage.getItem('user_name');
  const isUserAdminOrManager = userRole === 'Admin' || 'Manager';
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/users/${userName}/profile`, {
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
          },
        });
        setUserProfile(response.data);
        localStorage.setItem("user_id", response.data.id);
      } catch (error) {
        console.error('Error fetching assignees:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <Nav className="flex-column vertical-navbar">
      <Container className="profile-container">
        <h5>
          Hello, {userProfile.lastname} {userProfile.firstname}
        </h5>
        <h6>Profile: {userProfile.username}</h6>
        <h6>Role: {userProfile.role}</h6>
      </Container>
      <hr />
      <TaskList
        selectedRowId={selectedRowId}
        onRowClick={() => onButtonClick("Project")}
      />
      <hr />
      <Button onClick={() => onButtonClick("AllTasks")}>View All tasks</Button>
      <hr />
      <Button onClick={() => onButtonClick("CreateTask")}>
        Create New Task
      </Button>
      <hr />
      {isUserAdminOrManager &&
        <Button onClick={() => onButtonClick("CreateProject")}>Create New Project</Button>}
      <hr />
      {isUserAdminOrManager &&
        <Button onClick={() => onButtonClick("AssignProject")}>Assign Project</Button>}
    </Nav>
  );
};

export default LeftNavigation;

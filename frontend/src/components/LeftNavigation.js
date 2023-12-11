import React, { useState, useEffect } from "react";
import "../styles/css/LeftNavbar.css";
import { Nav, Container, Button } from "react-bootstrap";
import TaskList from "./TaskList";
import axios from 'axios';
const jwtToken = localStorage.getItem("jwtToken");

const LeftNavigation = ({ onButtonClick }) => {
  const userRole = localStorage.getItem('user_role');
  const userName = localStorage.getItem('user_name');
  const showCreateProjectButton = userRole === 'Admin' || 'Manager';
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
        <div>Profile: {userProfile.username}</div>
        <div>Hello, {userProfile.lastname} {userProfile.firstname}</div>
      </Container>
      <hr />
      <TaskList />
      <hr />
      <Button>View All tasks</Button>
      <hr />
      <Button onClick={() => onButtonClick("CreateTask")}>
        Create New Task
      </Button>
      <hr />
      {showCreateProjectButton && <Button>Create New Project</Button>}
    </Nav>
  );
};

export default LeftNavigation;

import React from "react";
import "../styles/css/LeftNavbar.css";
import { Nav, Container, Button } from "react-bootstrap";
import TaskList from "./TaskList";

const LeftNavigation = ({ onButtonClick }) => {
  const userRole = localStorage.getItem("user_role");
  const showCreateProjectButton = userRole === "Admin" || "Manager";
  return (
    <Nav className="flex-column vertical-navbar">
      <Container className="profile-container">
        <div>Profile Name</div>
        <div>Role</div>
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

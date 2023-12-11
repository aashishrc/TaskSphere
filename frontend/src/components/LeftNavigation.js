import React from "react";
import "../styles/css/LeftNavbar.css";
import { Nav, Container, Button } from "react-bootstrap";
import TaskList from "./TaskList";

const LeftNavigation = ({ onButtonClick}) => {
  return (
    <>
      <Nav className="flex-column vertical-navbar">
        <br />
        {/* <Nav.Link href="#vertical"> */}
        <Container className="profile-container">
          Profile Name: , Role:
        </Container>
        {/* </Nav.Link> */}
        <hr />
        <TaskList />
        <hr />
        <Button>View All tasks</Button>
        <hr />
        <Button>Create New Project</Button>
        <hr />
      </Nav>
    </>
  );
};
export default LeftNavigation;

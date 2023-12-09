import React from "react";
import TaskList from "./TaskList";
import "../styles/css/Home.css";
import { Button, Container, Nav } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <div>
        {/* <Container fluid className="main-content"> */}
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
          <Button>Create New Task</Button>
          <hr />
          <Button>Create New Project</Button>
          <hr />
          <Button>View Activity Log</Button>
        </Nav>
        {/* </Container> */}
      </div>
    </>
  );
};

export default Home;

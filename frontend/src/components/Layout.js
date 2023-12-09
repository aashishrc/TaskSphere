import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand href="/">TrackSphere</Navbar.Brand>

          {/* Can be used to add something on the left side. */}
          {/* <Nav className="me-auto"></Nav> */}

          {/* Items on the right side of the navbar are defined below */}
          <Nav className="ml-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
            <Nav.Link href="/kanbanBoard">KanbanBoard</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};
export default Layout;

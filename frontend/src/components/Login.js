import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "../styles/css/Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <Container fluid className="login-main">
        <Container className="login-title">
          <h1>Login</h1>
          <h6>login to manage your project</h6>
        </Container>
        <br />
        <Container className="login-form">
          <Row className="justify-content-md-center">
            <Col md="9">
              <Form>
                <Form.Group
                  controlId="formBasicUsername"
                  className="formGroup-custom"
                >
                  <Form.Label>Username :</Form.Label>
                  <Form.Control type="text" placeholder="Enter username" />
                </Form.Group>
                <br />
                <Form.Group
                  controlId="formBasicPassword"
                  className="formGroup-custom"
                >
                  <Form.Label>Password :</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <br />

                <Button variant="secondary" type="button">
                  Login
                </Button>
              </Form>
            </Col>
          </Row>
          <br />
          <Container className="login-footer">
            <h6>
              Not a member? <Link to={"/signup"}>Sign up Here</Link>
            </h6>
          </Container>
        </Container>
      </Container>
    </>
  );
};
export default Login;

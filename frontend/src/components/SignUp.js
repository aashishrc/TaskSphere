import React from "react";
import "../styles/css/SignUp.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const SignUp = () => {
  return (
    <>
      <Container fluid className="signUp-main">
        <Container className="signUp-title">
          <h1>Sign Up !</h1>
          <h6>Create your Account</h6>
        </Container>
        <br />
        <Container className="signUp-form">
          <Row className="justify-content-md-center">
            <Col md="10">
              <Form>
                <Row>
                  <Col>
                    <Form.Group
                      controlId="formBasicFirstName"
                      className="formGroup-custom"
                    >
                      <Form.Label>First Name :</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your First Name"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      controlId="formBasicLastName"
                      className="formGroup-custom"
                    >
                      <Form.Label>Last Name :</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your Last Name"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col md={8}>
                    <Form.Group
                      controlId="formBasicEmail"
                      className="formGroup-custom"
                    >
                      <Form.Label>Email Id :</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email Id"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group
                      controlId="formBasicDropdown"
                      className="formGroup-custom"
                    >
                      <Form.Label>Choose your Role : </Form.Label>
                      <Form.Select>
                        <option>Manager</option>
                        <option>Tech Lead</option>
                        <option>Developer</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <br />
                <Row>
                  <Col>
                    <Form.Group
                      controlId="formBasicPassword"
                      className="formGroup-custom"
                    >
                      <Form.Label>Password :</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter your Password"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      controlId="formBasicMatchPassword"
                      className="formGroup-custom"
                    >
                      <Form.Label>Re-type Password :</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter your Password again"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <br />

                <Button variant="secondary" type="button">
                  Create Account
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default SignUp;

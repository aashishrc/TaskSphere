import React, { useState } from "react";
import "../styles/css/SignUp.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import baseUrl from process.env.BASE_URL;

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "",
  });

  const handleChange = (e) => {
    console.log("changed");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Signup successful:", data);
        // Handle successful signup, e.g., redirect to login page
      } else {
        const errorData = await response.json();
        console.error("Signup failed:", errorData);
        // Handle signup failure, e.g., show an error message
      }
    } catch (error) {
      console.error("Error during signup:", error);
      // Handle network errors or other exceptions
    }
  };

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
              <Form onSubmit={handleSubmit}>
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
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                      {/* <input type="text"></input> */}
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
                        value={formData.lastName}
                        onChange={handleChange}
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
                      <Form.Label>UserName :</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email Id"
                        value={formData.username}
                        onChange={handleChange}
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
                        <option> Tech Lead</option>
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
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <br />

                <Button variant="secondary" type="submit">
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

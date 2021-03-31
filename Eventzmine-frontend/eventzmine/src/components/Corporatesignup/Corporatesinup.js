import React, { Component } from "react";
import Navbarr from "../Navbar/Navbar";
import logo from "../../logo.svg";
import { Redirect } from "react-router-dom";
import Footer from "../Footer/Footer";
import Serverservice from "../../Services/Serverservice";
import { Form, Button, Row, Col, Container, Alert } from "react-bootstrap";
export default class Signup extends Component {
  state = {
    input: {
      username: "",
      password: "",
      email: "",
    },
    redirect: null,
    showalert: false,
  };
  handleClick = (e) => {
    e.preventDefault();

    const data = {
      username: this.state.input.username,
      password: this.state.input.password,
      email: this.state.input.email,
    };

    console.log(data);
    Serverservice.corporatesignup(data)
      .then((response) => {
        console.log(response);
        this.setState({ redirect: "/auth/corporateverifyOtp" });
        localStorage.setItem("email", response.data.email);
      })
      .catch((err) => {
        console.log(err.response);
        this.setState({
          showalert: true,
        });
      });
  };
  handleChange = (event) => {
    let input = this.state.input;
    input[event.target.name] = event.target.value;

    this.setState({
      input,
    });
  };
  render() {
    let data = null;
    if (this.state.showalert) {
      data = (
        <Alert className="mt-2" variant="danger">
          Signup Failed!! Username or Email already registered
        </Alert>
      );
    }
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: this.state.redirect,
            state: {
              email: this.state.input.email,
            },
          }}
        />
      );
    }
    return (
      <div>
        <Navbarr />
        <Container fluid>
          {data}
          <Row className="justify-content-md-center mt-5">
            <Col></Col>
            <Col xs={4}>
              <h1 className="text-center">Signup</h1>
              <p className="mt-5">
                Good to have you in aou community sign up and enjoy all the
                advantages. Good to have you in aou community sign up and enjoy
                all the advantages. Good to have you in aou community sign up
                and enjoy all the advantages.
              </p>
              <p className="mt-3">
                Good to have you in aou community sign up and enjoy all the
                advantages. Good to have you in aou community sign up and enjoy
                all the advantages. Good to have you in aou community sign up
                and enjoy all the advantages.
              </p>
            </Col>
            <Col xs={1}></Col>
            <Col xs={4}>
              <img src={logo} style={{ width: "150px", marginLeft: "30%" }} />
              <Form className=" ">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="username"
                    name="username"
                    required
                    onChange={this.handleChange}
                    placeholder="Eg. Abc@123"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    required
                    onChange={this.handleChange}
                    placeholder="Enter email"
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    required
                    onChange={this.handleChange}
                    placeholder="Password"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                  />
                </Form.Group>

                <Button variant="dark" type="submit" onClick={this.handleClick}>
                  Submit
                </Button>
                <span className="ml-3">
                  Already a user?
                  <a href="/">Login</a>
                </span>
              </Form>
            </Col>
            <Col></Col>
          </Row>
        </Container>
        {/* <Footer></Footer> */}
      </div>
    );
  }
}

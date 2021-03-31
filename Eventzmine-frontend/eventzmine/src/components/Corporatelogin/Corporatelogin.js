import React, { Component } from "react";
import Navbarr from "../Navbar/Navbar";
import Serverservice from "../../Services/Serverservice";
import logo from "../../logo.svg";
import { Redirect } from "react-router-dom";
import Footer from "../Footer/Footer";
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
      password: this.state.input.password,
      username: this.state.input.username,
    };

    // console.log(data);
    Serverservice.corporatelogin(data)
      .then((response) => {
        console.log(response);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("usertype", response.data.usertype);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        this.setState({ redirect: "/" });
      })
      .catch((err) => {
        console.log(err.response);
        this.setState({ showalert: true });
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
    let data = null;
    if (this.state.showalert) {
      data = (
        <Alert className="mt-2" variant="danger">
          Login Failed!! Username or Password are incorrect
        </Alert>
      );
    }

    return (
      <div>
        <Navbarr username={localStorage.getItem("username")} />
        <Container fluid>
          {data}
          <Row className="justify-content-md-center mt-5">
            <Col></Col>
            <Col xs={4}>
              <h1 className="text-center">Login</h1>
              <h3 className="mt-5">Welcome Back O.</h3>
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
                    onChange={this.handleChange}
                    placeholder="Eg. Abc@123"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={this.handleChange}
                    placeholder="Password"
                  />
                </Form.Group>

                <Button variant="dark" type="submit" onClick={this.handleClick}>
                  Submit
                </Button>
                <span className="ml-3">
                  New to EventzMine ?<a href="/auth/signup">Signup</a>
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

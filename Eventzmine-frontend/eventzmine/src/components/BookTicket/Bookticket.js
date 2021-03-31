import React, { Component } from "react";
import Navbarr from "../Navbar/Navbar";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import StripeCheckout from "react-stripe-checkout";
import { Redirect } from "react-router-dom";
import Footer from "../Footer/Footer";
import Serverservice from "../../Services/Serverservice";
export default class Bookticket extends Component {
  state = {
    input: {
      noofticket: 0,
      state: "",
      address: "",
      postal_code: "",
      city: "",
      amount: 0,
    },
    ticketPrice: "",
    event: {},
    redirect: null,
  };

  bookTicket = (token) => {
    console.log(this.state.ticketPrice);
    const ticketnumber = parseInt(this.state.input.noofticket, 10);
    console.log(localStorage.getItem("id"));
    const data = {
      id: localStorage.getItem("id"),
      token: token,
      state: this.state.input.state,
      event: this.state.event,
      amount: this.state.event.ticketPrice * ticketnumber,
      postal_code: this.state.input.postal_code,
      city: this.state.input.city,
      address: this.state.input.address,
    };
    console.log(data);
    Serverservice.bookticket(data)
      .then((response) => {
        console.log(response);
        this.setState({
          redirect: "/user/yourtickets",
        });
      })
      .catch((err) => {
        if (err.response.status == 502) {
          this.setState({
            redirect: "/auth/login",
          });
        }
        console.log(err);
      });
  };
  onChange = (event) => {
    const input = this.state.input;
    input[event.target.name] = event.target.value;

    this.setState({
      input: input,
    });
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    console.log(id);

    Serverservice.eventdetail(id)
      .then((response) => {
        this.setState({
          event: response.data.event,
          ticketPrice: response.data.event.ticketPrice,
        });
        console.log(typeof this.state.event.ticketPrice);
        console.log(response);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: this.state.redirect,
            state: {
              email: this.state.input.city,
            },
          }}
        />
      );
    }
    return (
      <div>
        <Navbarr />
        <h1 className="text-center mt-4">Book Tickets</h1>
        <Container className="mt-5">
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder={this.state.event.email}
                  disabled
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Delhi,Mumbai etc"
                  onChange={this.onChange}
                  name="city"
                />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                type="text"
                placeholder="1234 Main St"
                onChange={this.onChange}
              />
            </Form.Group>

            <Form.Group controlId="formGridAddress2">
              <Form.Label>Address 2</Form.Label>
              <Form.Control placeholder="Apartment, studio, or floor" />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Number of Tickets</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="Choose..."
                  onChange={this.onChange}
                  name="noofticket"
                >
                  <option>Choose...</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="Choose..."
                  onChange={this.onChange}
                  name="state"
                >
                  <option>Choose...</option>
                  <option>Delhi</option>
                  <option>Mumbai</option>
                  <option>Kolkata</option>
                  <option>Chennai</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control onChange={this.onChange} name="postal_code" />
              </Form.Group>
            </Form.Row>
          </Form>
          <StripeCheckout
            stripeKey="pk_test_51Hp8UIADAJ7Tatd8OqTodI3sQLWaBaErZlWm3K76Jy2zZadBpR8HZZOVIg8mN1ZV2i0k42N2i3TjR4iGDXpil3JV00LldPAdBy"
            name="Buy Tickets"
            token={this.bookTicket}
          >
            <button
              type="submit"
              className="bookbutton mt-5"
              style={{ padding: "10px 25px" }}
            >
              <a
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "18px",
                }}
                // href={"/booktickets/" + this.props.match.params.id}
              >
                Pay ₹{this.state.ticketPrice * this.state.input.noofticket}
              </a>
            </button>
          </StripeCheckout>
        </Container>
      </div>
    );
  }
}

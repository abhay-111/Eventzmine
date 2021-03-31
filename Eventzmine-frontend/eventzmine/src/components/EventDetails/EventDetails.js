import React, { Component } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Navbarr from "../Navbar/Navbar";
import StripeCheckout from "react-stripe-checkout";
import { NavLink, Redirect } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
// import p1 from "../../assets/p1.jpg";
import "../EventDetails/Eventdetail.css";
// import Startrating from "react-star"
import StarRatings from "react-star-ratings";
import m2 from "../../assets/m2.jpg";

import Serverservice from "../../Services/Serverservice";
// import { Container } from "react-bootstrap";
export default class EventDetails extends Component {
  state = {
    input: {
      noofticket: "",
      ticketPrice: 0,
    },
    event: {},
    redirect: null,
  };
  checkauth = () => {
    const token = localStorage.getItem("token");
    const usertype = localStorage.getItem("usertype");
    if (token == undefined || token == null || usertype === "Corporate") {
      this.setState({
        redirect: "/auth/login",
      });
    } else {
      this.setState({
        redirect: "/booktickets/" + this.props.match.params.id,
      });
    }
  };
  changeRating = (e) => {
    console.log(e);
  };

  bookTicket = (token) => {
    const data = {
      token: token,
      event: this.state.event,
      amount: 200,
    };
    Serverservice.bookticket(data)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
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

    Serverservice.eventdetail(id)
      .then((response) => {
        this.setState({
          event: response.data.event,
          ticketPrice: response.data.event.ticketPrice,
        });
        console.log(this.state.event);
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
            // state: {
            //   email: this.state.input.city,
            // },
          }}
        />
      );
    }
    return (
      <div className="banner">
        <Navbarr />

        <Container className="mt-5 " fluid>
          <Row>
            <Col>
              <Container>
                <img
                  className="ml-5"
                  src={"http://localhost:8080/" + this.state.event.posterUrl}
                  style={{ width: "60%", borderRadius: "8px", height: "500px" }}
                  alt={"ALternate"}
                />
              </Container>
            </Col>
            <Col lg={8}>
              <Container className="mt-5">
                <h1>{this.state.event.eventname} </h1>
                <ReactStars
                  count={5}
                  value={4}
                  edit={false}
                  // onChange={ratingChanged}
                  size={24}
                  activeColor="#ffd700"
                />
                <h4 className="text-muted">{this.state.event.eventtype}</h4>
                <p className="mt-4">{this.state.event.eventdescription}</p>

                <hr></hr>
                <h4>Event Details</h4>
                <Row className="mt-4">
                  <Col>
                    <h5>City</h5>
                    <h6>{this.state.event.eventcity}</h6>
                  </Col>
                  <Col>
                    <h5>Region</h5>
                    <h6>{this.state.event.eventregion}</h6>
                  </Col>
                  <Col>
                    <h5>Date</h5>
                    <h6>{this.state.event.eventdate}</h6>
                  </Col>
                  <Col>
                    <h5>Expected Seats</h5>
                    <h6>{this.state.event.audience}</h6>
                  </Col>
                  <Col>
                    <h5>Email</h5>
                    <h6>{this.state.event.email}</h6>
                  </Col>
                  <Col>
                    <h5>Ticket Price</h5>
                    <h6>{this.state.event.ticketPrice}</h6>
                  </Col>
                  <Container>
                    <b>Rate this Event</b>
                    <ReactStars
                      count={5}
                      // onChange={ratingChanged}
                      size={30}
                      // onChange={this.onChange()}
                      activeColor="#ffd700"
                    />
                  </Container>
                </Row>
                <button className="bookbutton mt-5">
                  {/* <a
                    href={"/booktickets/" + this.props.match.params.id}
                    style={{ color: "white", textDecoration: "none" }}
                    // href={"/booktickets/" + this.props.match.params.id}
                  >
                    Book Tickets
                  </a> */}
                  <a
                    onClick={this.checkauth}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Book Tickets
                  </a>
                </button>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

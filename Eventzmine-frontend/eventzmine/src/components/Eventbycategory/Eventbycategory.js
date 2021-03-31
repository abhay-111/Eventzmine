import React, { Component } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Serverservice from "../../Services/Serverservice";
import "../Eventbycategory/Eventbycategory.css";
import { Link } from "react-router-dom";
import Navbarr from "../Navbar/Navbar";
import EventCard from "../EventCard/EventCard";
import Spinning from "../../assets/Fidget.gif";
import Footer from "../Footer/Footer";
export default class Eventbycategory extends Component {
  state = {
    event: [],
    type: this.props.match.params.eventtype,
    isloading: true,
  };

  componentDidMount() {
    console.log("mounted");
    // const eventtype = this.props.match.params.eventtype;
    // console.log(eventtype);

    // console.log(eventtype);
    // console.log(this.state.type);
    // this.setState({
    //   type: "abhay",
    // });
    Serverservice.eventbycategory(this.state.type)
      .then((response) => {
        console.log(response);
        this.setState({
          event: response.data.events,
          isloading: false,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  render() {
    let data = null;
    if (this.state.isloading) {
      data = (
        <Col xs={9}>
          <Spinner
            style={{
              position: "absolute",
              top: "50%",
              left: "40%",
              height: "50px",
              width: "50px",
            }}
            animation="border"
          />
        </Col>
      );
    } else {
      data = (
        <Col xs={9}>
          {this.state.event.map((data) => {
            return (
              <Container className="mt-3">
                <EventCard
                  eventname={data.eventname}
                  eventtype={data.eventtype}
                  eventregion={data.eventregion}
                  eventcity={data.eventcity}
                  audience={data.audience}
                  eventdate={data.eventdate}
                  eventdescription={data.eventdescription}
                  id={data._id}
                  email={data.email}
                  ticketprice={data.ticketPrice}
                  posterUrl={data.posterUrl}
                />
              </Container>
            );
          })}
        </Col>
      );
    }
    return (
      <React.Fragment>
        <Navbarr />
        <Container className="mt-5" fluid>
          <Row>
            <Col>
              <Container className="sidebar">
                <div style={{ margin: "10px 20px" }}>
                  <h5>Search Events</h5>
                  <hr></hr>
                  <h6>Event Type</h6>
                  <ul className="ml-5">
                    <li>
                      <Link to="/">Sports</Link>
                    </li>
                    <li>
                      <Link to="/">Plays</Link>
                    </li>
                    <li>
                      <Link to="/">Workshops</Link>
                    </li>
                    <li>
                      <Link to="/">Comedy</Link>
                    </li>
                  </ul>
                  <hr />
                  <h6>Event City</h6>
                  <ul className="ml-5">
                    <li>
                      <Link to="/">Delhi</Link>
                    </li>
                    <li>
                      <Link to="/">Mumbai</Link>
                    </li>
                    <li>
                      <Link to="/">Kolkata</Link>
                    </li>
                    <li>
                      <Link to="/">Chennai</Link>
                    </li>
                  </ul>
                  <hr />
                </div>
              </Container>
            </Col>
            {data}
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

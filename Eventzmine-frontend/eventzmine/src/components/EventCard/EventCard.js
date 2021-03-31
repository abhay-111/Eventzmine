import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import p4 from "../../assets/p4.jpg";
import p3 from "../../assets/p3.jpg";
import p1 from "../../assets/p1.jpg";

export default class EventCard extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <div className="eventcard">
            <Row style={{ padding: "10px 10px" }}>
              <Col>
                <img
                  src={"http://localhost:8080/" + this.props.posterUrl}
                  style={{
                    backgroundPosition: "center",
                    height: "200px",
                    width: "380px",
                    borderRadius: "8px",
                  }}
                ></img>
              </Col>
              <Col xs={7}>
                <h4>{this.props.eventname}</h4>
                <p className="text-muted">{this.props.eventtype}</p>
                <p>{this.props.eventdescription.substring(0, 150)}</p>
                <Row>
                  <Col className="text-muted">{this.props.eventcity}</Col>
                  <Col className="text-muted">{this.props.eventregion}</Col>
                  <Col className="text-muted">{this.props.eventdate}</Col>
                  <Col className="text-muted">{this.props.audience}</Col>
                  <Col className="text-muted">{this.props.eventcity}</Col>
                  <Col className="text-muted">{this.props.ticketprice}</Col>
                </Row>

                <div
                  style={{ float: "right", color: "blue" }}
                  className="mt-4 mr-3"
                >
                  {/* <Link to={ } >View Details</Link> */}
                  <NavLink to={"/eventdetail/" + this.props.id}>
                    View Details
                  </NavLink>
                  {/* <a href={"/eventdetail/" + this.props.id}></a> */}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

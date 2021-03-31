import React, { Component } from "react";
import "../Home/Home.css";
import Navbarr from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Button, Carousel, Container, Card } from "react-bootstrap";
import logo from "../../logo.svg";
import { Redirect } from "react-router-dom";
import p2 from "../../assets/p2.jpg";
import ad1 from "../../assets/ad1.jpg";
import p4 from "../../assets/p4.jpg";
import p3 from "../../assets/p3.jpg";
import p1 from "../../assets/p1.jpg";

import m2 from "../../assets/m2.jpg";
import m4 from "../../assets/m4.jpg";
import m3 from "../../assets/m3.jpg";
import m1 from "../../assets/m1.jpg";
import { Row, Col } from "react-bootstrap";
import e2 from "../../assets/e2.webp";
import e5 from "../../assets/e5.webp";
import e4 from "../../assets/e4.webp";
import e3 from "../../assets/e3.webp";
import e1 from "../../assets/e1.webp";
import Serverservice from "../../Services/Serverservice";
// import StripeCheckout from "react-stripe-checkout";
export default class Home extends Component {
  state = {
    topByLang: [],
    topByArea: [],
    redirect: null,
  };
  componentDidMount() {
    // const usertype = localStorage.getItem("usertype");
    // if (usertype == "Corporate") {
    //   this.setState({
    //     redirect: "/corporate/createevent",
    //   });
    // }
    Serverservice.homeDetails().then((response) => {
      console.log(response);
      this.setState({
        topByArea: response.data.data,
      });
    });
  }
  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: this.state.redirect,
          }}
        />
      );
    }
    return (
      <div className="bg-light">
        <Navbarr username={localStorage.getItem("username")} />

        <Carousel
          style={{
            margin: "20px 20px",
            boxShadow: "7px 10px 22px -8px rgba(20,17,20,0.53)",
          }}
        >
          <Carousel.Item>
            <img
              className="d-block w-100"
              style={{ height: "300px" }}
              src={p1}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{ height: "300px" }}
              className="d-block w-100"
              src={p2}
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{ height: "300px" }}
              className="d-block w-100"
              src={p3}
              // src="holder.js/800x400?text=Third slide&bg=20232a"
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{ height: "300px" }}
              className="d-block w-100"
              src={p4}
              // src="holder.js/800x400?text=Third slide&bg=20232a"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
        <div className="projectcont mt-5 ">
          <div>
            <h3 className="ml-2 mb-2">
              Recommended Movies{" "}
              <span
                className="mr-5"
                style={{ float: "right", fontSize: "20px" }}
              >
                <p>
                  <a href="#aba">See all</a>
                </p>
              </span>
            </h3>
          </div>

          <div class="project" style={{ width: "100%" }}>
            {this.state.topByArea.map((data) => {
              return (
                <a href={"/eventdetail/" + data._id}>
                  <div>
                    <div class="card">
                      <img
                        src={"http://localhost:8080/" + data.posterUrl}
                        alt="Avatar"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div className="mt-2 ml-2">
                      <h5 className="text-dark">{data.eventname}</h5>
                      <p className="text-muted">{data.eventtype}</p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          <div>
            <img src={ad1} style={{ width: "100%" }} alt="Advertisement" />
          </div>

          <div className="mt-5">
            <h3 className="ml-2 mb-2">
              Recommended Movies{" "}
              <span
                className="mr-5"
                style={{ float: "right", fontSize: "20px" }}
              >
                <p>
                  <a href="#aba">See all</a>
                </p>
              </span>
            </h3>
          </div>

          <div class="project " style={{ width: "100%" }}>
            {this.state.topByArea.map((data) => {
              return (
                <a href="#abhay">
                  <div>
                    <div class="card">
                      <img
                        src={"http://localhost:8080/" + data.posterUrl}
                        alt="Avatar"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div className="mt-2 ml-2">
                      <h5 className="text-dark">{data.eventname}</h5>
                      <p className="text-muted">{data.eventtype}</p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="mt-5">
            <h3 className="ml-2 mb-2">
              Recommended Movies{" "}
              <span
                className="mr-5"
                style={{ float: "right", fontSize: "20px" }}
              >
                <p>
                  <a href="#aba">See all</a>
                </p>
              </span>
            </h3>
          </div>

          <div class="project " style={{ width: "100%" }}>
            {this.state.topByArea.map((data) => {
              return (
                <a href={"/eventdetail/" + data.id}>
                  <div>
                    <div class="card">
                      <img
                        src={"http://localhost:8080/" + data.posterUrl}
                        alt="Avatar"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div className="mt-2 ml-2">
                      <h5 className="text-dark">{data.eventname}</h5>
                      <p className="text-muted">{data.eventtype}</p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}

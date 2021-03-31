import React, { Component } from "react";
import Navbarr from "../Navbar/Navbar";
import Serveservice from "../../Services/Serverservice";
// import chechAuth, { checkauth } from "../../utils/checkAuth";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Carousel,
  Button,
} from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Footer from "../Footer/Footer";
// import Carousel from "";
import p2 from "../../assets/p2.jpg";
// import ad1 from "../../assets/ad1.jpg";
import p4 from "../../assets/p4.jpg";
import p3 from "../../assets/p3.jpg";
import p1 from "../../assets/p1.jpg";

export default class Createevent extends Component {
  state = {
    input: {
      email: "",
      eventname: "",
      eventtype: "",
      eventcity: "",
      eventregion: "",
      audience: "",
      eventdescription: "",
      eventdate: "",
      ticketprice: "",
    },
    image: "",
    redirect: null,
  };
  checkauth = () => {
    const token = localStorage.getItem("token");
    const usertype = localStorage.getItem("usertype");
    if (token == undefined || token == null || usertype === "User") {
      this.setState({
        redirect: "/auth/corporatelogin",
      });
    }
  };

  onChange = (event) => {
    const input = this.state.input;
    input[event.target.name] = event.target.value;

    this.setState({
      input: input,
    });
  };
  componentDidMount() {
    this.checkauth();
    // checkauth("/", "/event/Plays");
  }
  onImageChange = (event) => {
    //console.log(event.target.files[0]);

    this.setState({
      image: event.target.files[0],
    });
  };
  handleClick = (e) => {
    e.preventDefault();

    console.log(this.state.image);
    const data = {
      email: this.state.input.email,
      eventname: this.state.input.eventname,
      eventtype: this.state.input.eventtype,
      eventcity: this.state.input.eventcity,
      eventregion: this.state.input.eventregion,
      audience: this.state.input.audience,
      eventdescription: this.state.input.eventdescription,
      eventdate: this.state.input.eventdate,
      ticketprice: this.state.input.ticketprice,
      id: localStorage.getItem("id"),
      image: this.state.image,
    };
    const fd = new FormData();

    for (let formElement in data) {
      fd.append(formElement, data[formElement]);
    }
    console.log(fd);
    Serveservice.createEvent(fd)
      .then((response) => {
        console.log(response);
        this.setState({
          redirect: "/corporate/yourevents",
        });
      })
      .catch((err) => {
        if (err.response.status == 502) {
          this.setState({
            redirect: "/auth/login",
          });
        }
        console.log(err.response);
      });
  };
  render() {
    if (this.state.redirect != null) {
      return (
        <Redirect
          to={{
            pathname: this.state.redirect,
          }}
        />
      );
    }
    return (
      <div>
        <Navbarr />
        <Carousel
          style={{
            margin: "20px 20px",
            boxShadow: "7px 10px 22px -8px rgba(20,17,20,0.53)",
          }}
        >
          <Carousel.Item>
            <img
              className="d-block w-100"
              style={{ height: "250px" }}
              src={p1}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{ height: "250px" }}
              className="d-block w-100"
              src={p2}
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{ height: "250px" }}
              className="d-block w-100"
              src={p3}
              // src="holder.js/800x400?text=Third slide&bg=20232a"
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{ height: "250px" }}
              className="d-block w-100"
              src={p4}
              // src="holder.js/800x400?text=Third slide&bg=20232a"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
        <Container className="text-center">
          <h1>List Your Event</h1>
          <p className="text-muted">
            but also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of
            Letraset shLorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's standard
            dummy text ever since the 1500s, when an unknown printer took a
            galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries,eets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </p>
          <Container>
            <Form>
              <Row>
                <Col>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      onChange={this.onChange}
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="phoneno"
                      placeholder="Enter your Contact Number"
                      onChange={this.onChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="eventname"
                      onChange={this.onChange}
                      placeholder="Enter Event Name"
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Event Date</Form.Label>
                    <Form.Control
                      type="date"
                      onChange={this.onChange}
                      name="eventdate"
                      placeholder="Enter email"
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Ticket Price</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={this.onChange}
                      name="ticketprice"
                      placeholder="Enter Ticket Price"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Expected Auidence</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={this.onChange}
                      name="audience"
                    >
                      <option>Choose...</option>
                      <option>1-100</option>
                      <option>100-200</option>
                      <option>200-300</option>
                      <option>300-400</option>
                      <option>500+</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Event Region</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={this.onChange}
                      name="eventregion"
                    >
                      <option>Choose...</option>
                      <option>East</option>
                      <option>West</option>
                      <option>North</option>
                      <option>South</option>
                      <option>Central</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Event City</Form.Label>
                    <Form.Control
                      onChange={this.onChange}
                      as="select"
                      name="eventcity"
                      defaultValue="3"
                      required="true"
                    >
                      <option>Choose...</option>
                      <option>Delhi</option>
                      <option>Mumbai</option>
                      <option>Chennai</option>
                      <option>Banglore</option>
                      <option>Kolkata</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Event Type</Form.Label>
                    <Form.Control
                      onChange={this.onChange}
                      name="eventtype"
                      as="select"
                    >
                      <option>Choose...</option>
                      <option>Sports</option>
                      <option>Plays</option>
                      <option>Comedy</option>
                      <option>Movies</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Event Description</Form.Label>
                <Form.Control
                  onChange={this.onChange}
                  name="eventdescription"
                  placeholder="Describe your event in less than 50 words"
                  as="textarea"
                  rows={3}
                />
              </Form.Group>
              {/* <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Event Description</Form.Label>
                <Form.File id="exampleFormControlFile1" />
              </Form.Group> */}
              <Form.Group>
                <Form.Label className="mt-4"> Upload Poster </Form.Label>
                <Form.Control
                  type="file"
                  name="files"
                  alt="image"
                  onChange={this.onImageChange}
                />
              </Form.Group>
              <Button
                type="submit"
                className="mt-5"
                // style={{  }}
                style={{ width: "100%", fontWeight: "800", fontSize: "1.25em" }}
                onClick={this.handleClick}
              >
                Submit
              </Button>
            </Form>
          </Container>
        </Container>
        <Footer></Footer>
      </div>
    );
  }
}

import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { Container, Row, Col } from "react-bootstrap";
const FooterPage = () => {
  return (
    <footer
      className="text-center text-white mt-5"
      style={{
        backgroundColor: "#212529",
        listStyle: "none",
        textDecoration: "none",
      }}
    >
      <br></br>
      <i>Made by @AbhayChauhan</i>
      <br></br>
    </footer>
  );
};

export default FooterPage;

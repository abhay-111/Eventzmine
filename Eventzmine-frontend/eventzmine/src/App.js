import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Navbar, NavLink, Nav, NavDropdown } from "react-bootstrap";
import "./App.css";
import EventDetail from "./components/EventDetails/EventDetails";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Verifyotp from "./components/Otp/Verifyotp";
import CorporateOtp from "./components/Otp/CorporateOtp";
import Yourevents from "./components/Yourevents/Yourevents";
import Corporatelogin from "./components/Corporatelogin/Corporatelogin";
import Corporatesinup from "./components/Corporatesignup/Corporatesinup";
import Createevent from "./components/Createevent/Createevent";
import Eventbycategory from "./components/Eventbycategory/Eventbycategory";
import Bookticket from "./components/BookTicket/Bookticket";
import Yourtickets from "./components/Yourtickets/Yourtickets";
import Profile from "./components/Profile/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/auth/signup" component={Signup} />
        <Route exact path="/auth/login" component={Login} />
        <Route exact path="/auth/verifyOtp" component={Verifyotp} />
        <Route exact path="/auth/corporatelogin" component={Corporatelogin} />
        <Route exact path="/auth/corporatesignup" component={Corporatesinup} />
        <Route exact path="/auth/corporateverifyOtp" component={CorporateOtp} />
        <Route exact path="/user/yourtickets" component={Yourtickets} />
        <Route exact path="/corporate/yourevents" component={Yourevents} />
        <Route exact path="/corporate/createevent" component={Createevent} />
        <Route exact path="/user/profile" component={Profile} />
        <Route
          exact
          path="/event/:eventtype"
          render={(props) => (
            <Eventbycategory key={props.location.pathname} {...props} />
          )}
        />
        <Route
          exact
          path="/user/profile/:eventtype"
          render={(props) => (
            <Profile key={props.location.pathname} {...props} />
          )}
        />
        <Route
          exact
          path="/booktickets/:id"
          render={(props) => (
            <Bookticket key={props.location.pathname} {...props} />
          )}
        />
        <Route
          exact
          path="/eventdetail/:id"
          render={(props) => (
            <EventDetail key={props.location.pathname} {...props} />
          )}
        />
      </div>
    </BrowserRouter>
  );
}

const Event = require("../models/Event");
const Corporate = require("../models/Corporate");
const mongoose = require("mongoose");
const { response } = require("express");
exports.createEvent = (req, res, next) => {
  const poster = req.file;
  const email = req.body.email;
  const eventname = req.body.eventname;
  const eventtype = req.body.eventtype;
  const eventcity = req.body.eventcity;
  const eventregion = req.body.eventregion;
  const audience = req.body.audience;
  const ticketprice = req.body.ticketprice;
  const eventdescription = req.body.eventdescription;
  const eventdate = req.body.eventdate;
  const id = req.body.id;
  console.log(poster);
  console.log(ticketprice);
  Event.findOne({ email: email, eventname: eventname })
    .then((data) => {
      if (data) {
        const error = new Error("No User Found");
        error.data = {
          location: "signup",
          msg: "validation Failed",
        };
        error.statusCode = 422;
        throw error;
      }
      const event = new Event({
        email: email,
        eventregion: eventregion,
        eventname: eventname,
        eventcity: eventcity,
        eventdate: eventdate,
        audience: audience,
        eventtype: eventtype,
        eventdescription: eventdescription,
        ticketPrice: ticketprice,
        posterUrl: poster.path,
      });
      event
        .save()
        .then(() => {
          const newevent = {
            id: event._id,
            email: email,
            eventname: eventname,
            eventcity: eventcity,
            eventdate: eventdate,
            audience: audience,
            eventtype: eventtype,
            eventregion: eventregion,
            eventdescription: eventdescription,
            ticketPrice: ticketprice,
            posterUrl: poster.path,
          };
          console.log(id);
          Corporate.findById(id).then((data) => {
            const newevents = [...data.eventsCreated, newevent];
            data.eventsCreated = newevents;
            data.save();
          });

          res.status(200).json({
            msg: "Event Created !!",
            id: event._id,
          });
        })
        .catch((err) => {
          console.log(err);
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getyourevents = (req, res, next) => {
  const id = req.body.id;

  Corporate.findById(id)
    .then((response) => {
      res.status(200).json({
        events: response.eventsCreated,
      });
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.deleteevents = (req, res, next) => {
  const id = req.body.id;
  const userId = req.body.userId;
  console.log(id);

  Event.findByIdAndDelete(id)
    .then((response) => {
      Corporate.findById(userId)
        .then((data) => {
          const newevents = data.eventsCreated.filter(
            (event) => event.id != id
          );
          data.eventsCreated = newevents;
          data.save();
        })
        .catch((err) => {
          console.log(err);
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
      res.status(200).json({
        msg: "Event Deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

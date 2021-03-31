const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  email: {
    type: String,
  },
  eventname: {
    type: String,
  },
  eventtype: {
    type: String,
  },
  eventcity: {
    type: String,
  },
  eventregion: {
    type: String,
  },
  audience: {
    type: String,
  },
  eventdescription: {
    type: String,
  },
  eventdate: {
    type: String,
  },
  ticketPrice: {
    type: Number,
  },
  posterUrl: {
    type: String,
  },
});

module.exports = mongoose.model("Event", eventSchema);

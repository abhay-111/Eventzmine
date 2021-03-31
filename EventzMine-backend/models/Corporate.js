const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const corporateSchema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  isverified: {
    type: Boolean,
    default: false,
  },
  eventsCreated: [],
});

module.exports = mongoose.model("Corporate", corporateSchema);

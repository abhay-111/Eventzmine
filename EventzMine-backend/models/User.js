const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  yourTikets: [],
  isverified: {
    type: Boolean,
    default: false,
  },
  preferedLanguage: {
    type: String,
  },
  preferedGerne: {
    type: String,
  },
  city: {
    type: String,
  },
  Addressl1: {
    type: String,
  },
  Addressl2: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);

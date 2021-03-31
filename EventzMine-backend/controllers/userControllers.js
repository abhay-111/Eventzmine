const User = require("../models/User");
const path = require("path");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const bcrypt = require("bcrypt");
exports.yourtickets = (req, res, next) => {
  const { id } = req.body;
  User.findById(id)
    .then((data) => {
      res.status(200).json({
        ticket: data.yourTikets,
        msg: "Tickets fetched",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.generateTicket = (req, res, next) => {
  const eventId = req.body.eventId;
  const userId = req.body.userId;
  // console.log(__dirname);

  // .catch((err) => {
  //   console.log(err);
  //   if (!err.statusCode) {
  //     err.statusCode = 500;
  //   }
  //   next(err);
  // });
};
exports.profile = (req, res, next) => {
  const {
    Addressl1,
    Addressl2,
    id,
    city,
    preferedGerne,
    preferedLanguage,
  } = req.body;
  // console.log(Addressl1, Addressl2, id, city, preferedGerne, preferedLanguage);
  User.findById(id).then((user) => {
    user.Addressl1 = Addressl1;
    user.Addressl2 = Addressl2;
    user.city = city;
    user.preferedGerne = preferedGerne;
    user.preferedLanguage = preferedLanguage;
    user
      .save()
      .then((data) => {
        res.status(200).json({
          msg: "Profile Updated",
        });
      })
      .catch((err) => {
        console.log(err);
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  });
};
exports.getprofile = (req, res, next) => {
  const { id } = req.body;
  // console.log(Addressl1, Addressl2, id, city, preferedGerne, preferedLanguage);
  User.findById(id)
    .then((user) => {
      console.log(user);
      res.status(200).json({
        msg: "Profile Updated",
        data: user,
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
exports.changepassword = (req, res, next) => {
  const { password, newpassword, id } = req.body;
  console.log(password, newpassword, id);
  User.findById(id)
    .then((data) => {
      bcrypt
        .compare(password, data.password)
        .then((match) => {
          if (!match) {
            const error = new Error("Invalid Password");
            error.data = {
              location: "Change password",
            };
            error.statusCode = 401;
            throw error;
          }
          bcrypt
            .hash(newpassword, 12)
            .then((hashpass) => {
              data.password = hashpass;
              data.save();
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
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

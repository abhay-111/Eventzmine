const User = require("../models/User");
const { validationResult } = require("express-validator/check");
const bcrypt = require("bcrypt");
const otpgenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const Otp = require("../models/Otp");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const nodemailer = require("nodemailer");
const sendGrid = require("sendgrid");
const Corporate = require("../models/Corporate");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);
exports.signup = (req, res, next) => {
  console.log("here");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed ");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  console.log(email);

  User.findOne({ email: email })
    .then((data) => {
      if (data) {
        const error = new Error("No User Found");
        errors.data = {
          location: "signup",
          msg: "validation Failed",
        };
        error.statusCode = 422;
        throw error;
      }
      console.log(email);
      bcrypt.hash(password, 12).then((hashedpass) => {
        const user = new User({
          username: username,
          password: hashedpass,
          email: email,
        });

        user.save();

        const newotp = otpgenerator.generate(6, {
          upperCase: false,
          specialChars: false,
        });
        const otp = new Otp({
          otp: newotp,
          email: email,
        });
        otp
          .save()
          .then(() => {
            transporter.sendMail({
              to: email,
              subject: "Otp verification",
              from: "naman1913128@akgec.ac.in",
              html: `<h1>)tp: ${newotp} </h1>`,
            });
          })
          .then(() => {
            res.status(200).json({
              msg: "Otp sent",
              email: email,
            });
          })
          .catch((err) => {
            console.log(err);
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          });

        // user
        //   .save()
        //   .then(() => {
        //     res.status(200).json({
        //       msg: "Signup Succesful!!",
        //     });
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //     if (!err.statusCode) {
        //       err.statusCode = 500;
        //     }
        //     next(err);
        //   });
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

exports.login = (req, res, next) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     const error = new Error("Validation Failed");
  //     error.data = errors.array();
  //     error.statusCode = 422;
  //     throw error;
  //   }
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username })
    .then((data) => {
      if (!data) {
        const error = new Error("No User found");
        error.data = {
          location: "login",
        };
        error.statusCode = 422;
        throw error;
      }
      // console.log(data);
      // if (!data.isverified) {
      //   const error = new Error("User not  verified");
      //   error.data = {
      //     location: "login",
      //   };
      //   error.statusCode = 422;
      //   throw error;
      // }
      bcrypt
        .compare(password, data.password)
        .then((match) => {
          if (!match) {
            const error = new Error("Invalid Password");
            error.data = {
              location: "login",
            };
            error.statusCode = 401;
            throw error;
          }
          const token = jwt.sign(
            {
              username: username,

              userId: data._id.toString(),
            },
            "superabhaysuper",
            { expiresIn: "1h" }
          );

          res.status(200).json({
            msg: "Login Succesful!!!",
            usertype: "User",
            id: data._id,
            token: token,
            username: username,
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
      // console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.corporateverifyOtp = (req, res, next) => {
  const email = req.body.email;
  const otp = req.body.otp;

  Otp.findOne({ email: email })
    .then((data) => {
      if (!data) {
        const error = new Error("Invalid Otp");
        error.data = {
          location: "verifyOtp",
        };
        error.statusCode = 401;
        throw error;
      }
      if (otp != data.otp) {
        const error = new Error("Invalid Password");
        error.data = {
          location: "login",
        };
        error.statusCode = 401;
        throw error;
      }

      Corporate.findOne({ email: email }).then((user) => {
        user.isverified = true;
        user
          .save()
          .then(() => {
            data.remove();
            const token = jwt.sign(
              {
                username: email,
                userId: data._id.toString(),
              },
              "superabhaysuper",
              { expiresIn: "1h" }
            );
            res.status(200).json({
              msg: "User verified Succesfully",
              usertype: "Corporate",
              id: user._id,
              token: token,
              username: user.username,
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
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.verifyOtp = (req, res, next) => {
  const email = req.body.email;
  const otp = req.body.otp;

  Otp.findOne({ email: email })
    .then((data) => {
      if (!data) {
        const error = new Error("Invalid Otp");
        error.data = {
          location: "verifyOtp",
        };
        error.statusCode = 401;
        throw error;
      }
      if (otp != data.otp) {
        const error = new Error("Invalid Password");
        error.data = {
          location: "login",
        };
        error.statusCode = 401;
        throw error;
      }

      User.findOne({ email: email }).then((user) => {
        user.isverified = true;
        user
          .save()
          .then(() => {
            data.remove();
            const token = jwt.sign(
              {
                username: email,
                usertype: "User",
                userId: data._id.toString(),
              },
              "superabhaysuper",
              { expiresIn: "1h" }
            );
            res.status(200).json({
              msg: "User verified Succesfully",
              usertype: "User",
              id: user._id,
              token: token,
              username: user.username,
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
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.resendOtp = (req, res, next) => {
  const email = req.body.email;
  console.log(email);
  Otp.findOne({ email: email }).then((data) => {
    data.remove();
    const newotp = otpgenerator.generate(6, {
      upperCase: false,
      specialChars: false,
    });
    const otp = new Otp({
      otp: newotp,
      email: email,
    });
    otp
      .save()
      .then(() => {
        res.status(200).json({
          msg: "Otp resent",
          email: email,
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

exports.corporatesignup = (req, res, next) => {
  console.log("here");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed ");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  console.log("abhay");
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  console.log(email);

  Corporate.findOne({ email: email })
    .then((data) => {
      if (data) {
        const error = new Error("No User Found");
        errors.data = {
          location: "signup",
          msg: "validation Failed",
        };
        error.statusCode = 422;
        throw error;
      }
      console.log(email);
      bcrypt.hash(password, 12).then((hashedpass) => {
        const corporate = new Corporate({
          username: username,
          password: hashedpass,
          email: email,
        });

        corporate.save();

        const newotp = otpgenerator.generate(6, {
          upperCase: false,
          specialChars: false,
        });
        const otp = new Otp({
          otp: newotp,
          email: email,
        });
        otp
          .save()
          .then(() => {
            transporter.sendMail({
              to: email,
              subject: "Otp verification",
              from: "naman1913128@akgec.ac.in",
              html: `<h1>)tp: ${newotp} </h1>`,
            });
          })
          .then(() => {
            res.status(200).json({
              msg: "Otp sent",
              email: email,
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
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.corporatelogin = (req, res, next) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     const error = new Error("Validation Failed");
  //     error.data = errors.array();
  //     error.statusCode = 422;
  //     throw error;
  //   }
  const username = req.body.username;
  const password = req.body.password;

  Corporate.findOne({ username: username })
    .then((data) => {
      if (!data) {
        const error = new Error("No User found");
        error.data = {
          location: "login",
        };
        error.statusCode = 422;
        throw error;
      }

      // console.log(data);
      // if (!data.isverified) {
      //   const error = new Error("User not  verified");
      //   error.data = {
      //     location: "login",
      //   };
      //   error.statusCode = 422;
      //   throw error;
      // }
      bcrypt
        .compare(password, data.password)
        .then((match) => {
          if (!match) {
            const error = new Error("Invalid Password");
            error.data = {
              location: "login",
            };
            error.statusCode = 401;
            throw error;
          }
          const token = jwt.sign(
            {
              username: username,

              userId: data._id.toString(),
            },
            "superabhaysuper",
            { expiresIn: "1h" }
          );
          console.log(data.username);
          res.status(200).json({
            msg: "Login Succesful!!!",
            usertype: "Corporate",
            id: data._id.toString(),
            token: token,
            username: data.username,
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

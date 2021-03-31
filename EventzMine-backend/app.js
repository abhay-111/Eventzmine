const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const eventRoutes = require("./routes/eventRoutes");
const authRoutes = require("./routes/authController");
const userRoutes = require("./routes/userRoutes");

const homeRoutes = require("./routes/homeRoutes");
const Event = require("./models/Event");
const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const corporateRoutes = require("./routes/corporateRoutes");
const app = express();
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, "Logo-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
app.use(express.static(path.join(__dirname, "ticket")));

app.use("/images", express.static(path.join(__dirname, "images")));
app.post("/search", (req, res, next) => {
  const { search } = req.body;
  console.log(search);
  Event.find({
    $text: {
      $search: search,
    },
  })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err.response);
    });
});
app.use("/auth", authRoutes);

app.use("/home", homeRoutes);
app.use("/user", userRoutes);
app.use("/corporate", corporateRoutes);
app.use("/event", eventRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const data = error.data;
  const message = error.message;

  res.status(status).json({
    message: message,
    data: data,
  });
});

mongoose
  .connect(
    "mongodb+srv://abhay:abhay123@cluster0.ptxfi.mongodb.net/data?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(8080, () => {
      console.log("server up and running");
    });
  })
  .catch((err) => {
    console.log(err);
  });

const Event = require("../models/Event");
const User = require("../models/User");
const path = require("path");
const fs = require("fs");
const PDFDocument = require("pdfkit");
const stripe = require("stripe")(
  "sk_test_51Hp8UIADAJ7Tatd8C9dGe2tS9NgNMAhVB1H7aYXLNLua0ossjDPFqPdAVxTeBgJKcLOGxKMAT4sAJ9tiMsCPEpUL00ecrfZuSr"
);
const uuid = require("uuid");
// import { v4 as uuidv4 } from "uuid";
exports.eventbycategory = (req, res, next) => {
  // console.log(req.params.eventtype);
  const eventtype = req.params.eventtype;
  Event.find({ eventtype: eventtype })
    .then((data) => {
      if (!data) {
        const error = new Error("No event Found");
        error.data = {
          location: "eventbycategory",
        };
        error.statusCode = 401;
        throw error;
      }
      res.status(200).json({
        events: data,
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

exports.eventdetails = (req, res, next) => {
  const id = req.params.id;
  Event.findById(id)
    .then((data) => {
      if (!data) {
        const error = new Error("No event Found");
        error.data = {
          location: "eventbycategory",
        };
        error.statusCode = 401;
        throw error;
      }
      res.status(200).json({
        msg: "Event Details Fetched!!",
        location: "eventdetails",
        event: data,
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

exports.booktickets = (req, res, next) => {
  // console.log("aagyaa");
  const {
    event,
    token,
    address,
    amount,
    state,
    city,
    postal_code,
    id,
  } = req.body;
  console.log(id);
  const indempotencykey = uuid.v4();
  // console.log(event, token, amount, indempotencykey);
  // console.log("aagyaa");
  stripe.customers
    .create({
      email: token.email,
      source: token.id,
      address: {
        line1: address,
        postal_code: postal_code,
        city: city,
        state: state,
        country: "India",
      },
    })
    .then((customer) => {
      // console.log("aagyaa");

      return stripe.charges.create({
        amount: amount * 100,
        currency: "INR",
        description: `Movie tickets`,
        customer: customer.id,
      });
    })
    .then((result) => {
      let ticketPath;
      User.findById(id).then((data) => {
        // console.log("data1==" + data);
        const TicketName = "Ticket-" + id + ".pdf";

        ticketPath = path.join(__dirname, "../", "ticket", TicketName);
        //  data.resume = "resume-" + userId + ".pdf";
        // return data.save();

        // console.log("data2=");
        // const userPdf = createPdf(resumePath, data);
        const pdfDoc = new PDFDocument();
        pdfDoc.pipe(fs.createWriteStream(ticketPath));
        // pdfDoc.pipe(res);

        pdfDoc.fontSize(22).text("Event Details ", {
          underline: true,
        });
        pdfDoc.moveDown();
        // var imageUrl = "image/" + data.imageUrl;
        // pdfDoc.image("images/Logo.png", 180, 150, { fit: [100, 100] });

        // TODO:fix this image in pdf bug
        // if (data.imageUrl != "" && data.imageUrl) {
        //   pdfDoc.image(data.imageUrl, 120, 110, { width: 100, height: 90 });
        //   pdfDoc.moveDown();
        //   pdfDoc.moveDown();
        //   pdfDoc.moveDown();
        //   pdfDoc.moveDown();
        // }

        // pdfDoc.moveDown();

        pdfDoc.fontSize(15).text("Event Name:" + event.eventname);

        pdfDoc.moveDown();

        // pdfDoc.moveDown();

        // pdfDoc.moveDown();
        pdfDoc.fontSize(18).text("Event City: " + event.eventcity);

        pdfDoc.moveDown();
        pdfDoc.fontSize(15).text("Event Region:" + event.eventregion);
        pdfDoc.moveDown();
        // pdfDoc.fontSize(18).text("Skills", {
        //   underline: true,
        // });
        pdfDoc.moveDown();
        pdfDoc.fontSize(15).text("Event Date :" + event.eventdate);
        pdfDoc.moveDown();
        pdfDoc.fontSize(18).text("Contact Event Organiser:" + event.email, {
          underline: true,
        });
        // pdfDoc.moveDown();
        // pdfDoc.fontSize(15).text("" + data.phone);
        // pdfDoc.moveDown();
        // pdfDoc.fontSize(18).text("Social media links", { underline: true });
        // pdfDoc.fontSize(15).text(data.links);
        // console.log(data);
        // console.log("outside pdf.end");
        // console.log("you can still do stuff after res");
        // data.resumecreated = true;
        // data
        //   .save()
        //   .then((result) => {
        //     res.status(200).json({ path: data.resume });
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
        const newticket = {
          ticketurl: TicketName,
          id: event._id,
          eventname: event.eventname,
          eventtype: event.eventtype,
          eventcity: event.eventcity,
          eventdescription: event.eventdescription,
          eventregion: event.eventregion,
          eventdate: event.eventdate,
          totalamount: amount,
          email: event.email,
        };

        const newarr = [...data.yourTikets, newticket];
        data.yourTikets = newarr;
        data
          .save()
          .then(() => {
            res.status(200).json({
              msg: "dat",
              result: result,
            });
          })
          .catch((err) => {
            console.log(err);
          });

        pdfDoc.end(() => {
          console.log("inside pdf.end");
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

const Event = require("../models/Event");
exports.homeDetails = (req, res, next) => {
  Event.find()
    .then((data) => {
      const byLang = [];
      const byArea = [];
      data.forEach((event) => {});
      res.status(200).json({
        data: data.slice(0, 5),
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

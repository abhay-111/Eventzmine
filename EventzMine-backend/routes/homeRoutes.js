const express = require("express");
const router = express.Router();
const eventControllers = require("../controllers/homeController");
const isAuth = require("../middlewares/isAuth");

router.get("/homeDetails", eventControllers.homeDetails);

module.exports = router;

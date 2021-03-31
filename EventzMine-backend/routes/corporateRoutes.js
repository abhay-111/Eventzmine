const express = require("express");
const { route } = require("./authController");
const eventControllers = require("../controllers/corporateControllers");
const isAuth = require("../middlewares/isAuth");
const router = express.Router();

router.post("/createevent", isAuth, eventControllers.createEvent);
router.post("/getyourevents", isAuth, eventControllers.getyourevents);
router.post("/deleteyourevent", isAuth, eventControllers.deleteevents);

module.exports = router;

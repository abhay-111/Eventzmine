const express = require("express");
const router = express.Router();
const eventControllers = require("../controllers/eventControllers");
const isAuth = require("../middlewares/isAuth");

router.get("/eventbycategory/:eventtype", eventControllers.eventbycategory);
router.get("/eventdetail/:id", eventControllers.eventdetails);
router.post("/booktickets", isAuth, eventControllers.booktickets);

module.exports = router;

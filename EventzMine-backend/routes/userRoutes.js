const express = require("express");
const isAuth = require("../middlewares/isAuth");
const router = express.Router();
const userControllers = require("../controllers/userControllers");

router.post("/yourtickets", isAuth, userControllers.yourtickets);
router.post("/printticket", isAuth, userControllers.generateTicket);
router.post("/profile", userControllers.profile);
router.post("/getprofile", userControllers.getprofile);
router.post("/changepassword", userControllers.changepassword);
module.exports = router;

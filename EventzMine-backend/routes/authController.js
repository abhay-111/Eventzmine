const authController = require("../controllers/authController");
const { body } = require("express-validator");
const express = require("express");
const router = express.Router();

router.post(
  "/signup",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isString().isLength({ min: 6 }),
    body("username").trim(),
  ],
  authController.signup
);
router.post("/login", [body("password").isString(), authController.login]);

router.post(
  "/corporatesignup",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isString().isLength({ min: 6 }),
    body("username").trim(),
  ],
  authController.corporatesignup
);
router.post("/corporatelogin", [
  body("password").isString(),
  authController.corporatelogin,
]);
router.post("/verifyOtp", authController.verifyOtp);
router.post("/corporateverifyOtp", authController.corporateverifyOtp);
router.post("/resendOtp", authController.resendOtp);
module.exports = router;

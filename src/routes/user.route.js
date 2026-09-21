const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();

const { successfulRegister, login } = require("../controllers/userRegisteration");
const { validate } = require("../middleware/validate");
const { registerChecker } = require("../validators/registerCheck");
const { loginChecker } = require("../validators/loginCheck");

const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: {
    status: "error",
    message: "Too many authentication attempts. Please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false
});

router.post("/register", authLimiter, validate(registerChecker), successfulRegister);
router.post("/login", authLimiter, validate(loginChecker), login);

module.exports = router;

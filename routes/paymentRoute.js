const express = require("express");
const {
  paymentVerification,
  sendRazorApiKey,
  checkout
} = require("../controllers/paymentController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/payment/process").post(isAuthenticatedUser, paymentVerification);
router.route("/checkout").post(isAuthenticatedUser, checkout);
router.route("/razorapikey").get(isAuthenticatedUser, sendRazorApiKey);

module.exports = router;
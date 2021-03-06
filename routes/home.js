var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { home, home_form, 
	user_details, user_detail_form, 
	dashboard, thanks, pay_qr, 
	pay_amount, make_payment, 
	success_payment, passbook, payment_accept,
	transfer_fund, transfer_amount } = require("../controllers/investor");


router.get("", home);
router.post("", home_form);

router.get("/details/:mobile", user_details);
router.post("/details/:mobile", user_detail_form);

router.get("/dashboard/:userId", dashboard);

router.get("/pay/:userId", pay_qr);

router.get("/passbook/:userId", passbook);
router.get("/payment_accept/:userId", payment_accept);

router.get("/make-payment/:userId", pay_amount);
router.post("/make-payment/:userId", make_payment);

router.get("/transfer-fund/:userId", transfer_fund);
router.post("/transfer-fund/:userId", transfer_amount);

router.post("/thanks/:userId", thanks);

module.exports = router;
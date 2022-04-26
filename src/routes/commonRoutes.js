const commonController = require("../controllers/common");
var express=require('express');
var router = express.Router();
var auth = require("../middlewares/auth")


router.post('/login',commonController.login);
router.get("/logout/:id",commonController.logout);
router.post("/changepassword",commonController.changepassword);
router.post("/livenews",commonController.livenews);
router.post("/changeforgotpassword",commonController.changeforgotpassword);
router.post("/forgotpassword",commonController.forgotpassword);//...
router.post("/forgotpassword/setpassword",commonController.newpassword);
router.post("/verifyEmailOTP",commonController.verifyOTPmail);//...
router.put("/resendMailOTP",commonController.resendMailOTP);
module.exports=router;

var express=require('express');
var router = express.Router();
const userController = require("../controllers/user")
const auth = require("../middlewares/auth")

router.post('/signup',userController.signup );
router.post("/addPaymentDetails",userController.addPaymentDetails);
router.put('/additionalDetails/:_id',userController.additionalDetails );
router.put('/additionalCompanyDetails/:_id',userController.additionalCompanyDetails );
router.get("/getFarmerProfile/:_id",userController.getFarmerProfile);
router.get("/getCompanyProfile/:_id",userController.getCompanyProfile);
router.get("/getfarmerPaymentDetails/:_id",userController.getfarmerPaymentDetails);
router.get("/getCompanyPaymentDetails/:_id",userController.getCompanyPaymentDetails);


module.exports=router;
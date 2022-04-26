
var express=require('express');
var router = express.Router();
const masterTablesController = require("../controllers/masterTables")
const auth = require("../middlewares/auth")

router.post("/addProduct",auth.verifyToken,masterTablesController.addProduct);
router.post("/acceptOffer",masterTablesController.acceptOffer);
router.get("/getUserProduct/:_id",auth.verifyToken,masterTablesController.getUserProduct);
router.get("/getAllProduct",auth.verifyToken,masterTablesController.getAllProduct);
router.get("/getAcceptOrderFarmer/:_id",masterTablesController.getAcceptOrderFarmer);
router.get("/getAcceptOrderCompany/:_id",masterTablesController.getAcceptOrderCompany);
router.put('/farmerAcceptOrRejectOffer/:_id',masterTablesController.farmerAcceptOrRejectOffer );
router.delete("/deleteAddProduct/:_id",auth.verifyToken,masterTablesController.deleteAddProduct);

module.exports=router;
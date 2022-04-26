var nodemailer = require('nodemailer');
var md5 = require('md5');
const msgs = require("../messages/success");
var handlebars = require('handlebars');
var fs = require('fs');
const auth = require("../middlewares/auth")
const error = require("../messages/error");
const mailId = process.env.user_email;
const pwd = process.env.PASSWORD;



var readHTMLFile = function(path, callback) {
  fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
      if (err) {
          throw err;
          callback(err);
      }
      else {
          callback(null, html);
      }
  });
};


exports.signup= function (req, res) {
    db.models.user.findOne({$or: [{email: req.body.email},{mobile: req.body.mobile}]},function(err,userData){
        if(err){
             return res.status(500).send({status:false,message:err.message});
        }
        if(userData){
           return res.status(200).send({status:false,message:error.emailTaken});
        }
     
      let password = req.body.password;
      req.body.password = password; 
      req.body.role = req.body.role;
      req .body.signupType = "normal" ;
      req .body.companyName =  req .body.companyName ;   
      var newUser = new db.models.user(req.body);
      newUser.save(function(err,newUserData){
            if(err){
               return res.status(500).send({status:false,message:err.message});
            }
              newUser.save();
                return res.status(201).send({status:true,message:msgs.registrationSuccess});

            });
    });
}

exports.addPaymentDetails = (req,res)=>{
  const payments = new db.models.payment(req.body);
  payments.save().then((data,err)=>{
      if(err){console.log(err);return res.status(500).send({status: false,message:err.message});}
      return res.status(201).send({status:true,message:msgs.dataInsertedSuccessfully});
  });
}

exports.additionalDetails= function (req, res) {
  db.models.user.updateOne({_id:req.params._id},{$set:{
      "addressLine1": req.body.addressLine1,
       "addressLine2": req.body.addressLine2,
       "state": req.body.state,
      "city": req.body.city,
      "totalLand": req.body.totalLand,
      "sizeUnitOfLand": req.body.sizeUnitOfLand,
      "landType": req.body.landType
    }},(err,data)=>{
             if(err){return res.status(500).send({status:false,message:err.message});}
             return res.status(200).send({status:true,message:msgs.success});
         });
}

exports.additionalCompanyDetails= function (req, res) {
  db.models.user.updateOne({_id:req.params._id},{$set:{
      "addressLine1": req.body.addressLine1,
       "addressLine2": req.body.addressLine2,
       "state": req.body.state,
      "city": req.body.city,
      "companyType": req.body.companyType
    }},(err,data)=>{
             if(err){return res.status(500).send({status:false,message:err.message});}
             return res.status(200).send({status:true,message:msgs.success});
         });
}


exports.getFarmerProfile = function(req,res){
  db.models.user.find({_id:req.params._id},(err,data)=>{
    if(err){return res.status(500).send({status: false,message:err.message});}
    if(!data){return res.status(204).send({status:false,message:error.notFound});}
    return res.status(200).send({status: true,data:data});
});
}

exports.getCompanyProfile = function(req,res){
  db.models.user.find({_id:req.params._id},(err,data)=>{
    if(err){return res.status(500).send({status: false,message:err.message});}
    if(!data){return res.status(204).send({status:false,message:error.notFound});}
    return res.status(200).send({status: true,data:data});
});
}

exports.getfarmerPaymentDetails = function(req,res){
  db.models.payment.find({userId:req.params._id},(err,data)=>{
    if(err){return res.status(500).send({status: false,message:err.message});}
    if(!data){return res.status(204).send({status:false,message:error.notFound});}
    return res.status(200).send({status: true,data:data});
});
}

exports.getCompanyPaymentDetails = function(req,res){
  db.models.payment.find({companyId:req.params._id},(err,data)=>{
    if(err){return res.status(500).send({status: false,message:err.message});}
    if(!data){return res.status(204).send({status:false,message:error.notFound});}
    return res.status(200).send({status: true,data:data});
});
}


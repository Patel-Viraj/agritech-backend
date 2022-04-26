var md5 = require('md5');
const auth = require("../middlewares/auth");
const msgs = require("../messages/success");
const error = require("../messages/error");
var nodemailer = require('nodemailer');
var handlebars = require('handlebars');
var fs = require('fs');
const mailId = process.env.user_email;
const pwd = process.env.PASSWORD;
const host = process.env.host;
const port = process.env.port;

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

exports.login = function (req, res) {
    req.body.password = req.body.password;
    db.models.user.findOne({email:req.body.email,password:req.body.password},function(err,userData){
      console.log(userData);
      console.log(!userData);
        if(err){
           return res.status(500).send({status:false,message:error.somethingWrong});
        }
        if(!userData){
          console.log("insode");
           return res.status(400).send({status:false,message:error.loginError});
        }
        // if(userData.token){return res.status(302).send({status:false, message:"Already Logged In"});}
        const token = auth.generateToken(req.body.email);
        console.log(token);
        db.models.user.updateOne({email:req.body.email},{$set:{token: token}},(err,data)=>{
          if(err){return res.status(500).send({status: false,message: error.somethingWrong});}
          db.models.user.findOne({email:req.body.email},(err,data)=>{
              if(err){return res.status(500).send({status:false, message: error.somethingWrong});}
              return res.status(202).send({status: true,message: msgs.loginSuccess,data: data});
          })
      });
  });
}
exports.logout= function(req,res){
    const id = req.params.id;
    db.models.user.updateOne({_id: id},{$set:{token: null}},(err,data)=>{
          if(err){return res.status(500).send({status:false,message:err.message})}
          if(!data.nModified){return res.status(304).send({status: false,message:error.somethingWrong})}
          return res.status(200).send({status: true,message:msgs.logoutSuccess})
    })
};
exports.livenews = async(req,res) => {
  try {
    var url = 'http://newsapi.org/v2/top-headlines?' +
      'country=in&' +
      'apiKey=e945a9b058b848c6bdccedf6a36b070d';

    const news_get =await axios.get(url)
    res.render('news',{articles:news_get.data.articles})

} catch (error) {
    if(error.response){
        console.log(error)
    }

}
}



exports.changepassword = (req,res) => {
    db.models.user.findOne({"email":req.body.email,"password":req.body.password},function(err,userData){
        if(err){
           return res.status(500).send({status:false,message:err.message});
        }
        if(!userData){
           return res.status(400).send({status:false,message:"Email and Password is not matching"});
        }
        newpassword = req.body.newpassword; 
        comfirmpassword = req.body.comfirmpassword; 
        if(newpassword != comfirmpassword){
            return res.status(406).send({status:false,message:"Newpassword and Comfirmpassword is not Matching "});
        }
        db.models.user.updateOne({email:req.body.email},{$set:{password:newpassword}},(err,data)=>{
          if(err){return res.status(500).send({status: false,message: err.message});}
          db.models.user.findOne({email:req.body.email},(err,data)=>{
              if(err){return res.status(500).send({status:false, message: err.message});}
              return res.status(201).send({status: true,message: "Password Reset Successfully",data: data});
          })
      }); 
  });
};


exports.changeforgotpassword = (req,res) => {
  db.models.user.findOne({"email":req.body.email},function(err,userData){
      if(err){
         return res.status(500).send({status:false,message:err.message});
      }
      if(!userData){
         return res.status(400).send({status:false,message:"Email is not matching"});
      }
      newpassword = req.body.newpassword; 
      comfirmpassword = req.body.comfirmpassword; 
      if(newpassword != comfirmpassword){
          return res.status(406).send({status:false,message:"Newpassword and Comfirmpassword is not Matching "});
      }
      db.models.user.updateOne({email:req.body.email},{$set:{password:newpassword}},(err,data)=>{
        if(err){return res.status(500).send({status: false,message: err.message});}
        db.models.user.findOne({email:req.body.email},(err,data)=>{
            if(err){return res.status(500).send({status:false, message: err.message});}
            return res.status(201).send({status: true,message: "Password Reset Successfully"});
        })
    }); 
});
};



exports.forgotpassword = (req,res) => {
    db.models.user.findOne({"email":req.body.email},function(err,userData){
        if(err){
           return res.send({status:false,message:err.message});
        }
        if(!userData){
           return res.send({status:false,message:"Email is not matching"});
        }
try {
  const otp =  auth.generateOTP()
  db.models.user.updateOne({email:req.body.email},{$set:{
   "otp": otp,
 }},(err,data)=>{
          if(err){return res.status(500).send({status:false,message:err.message});}
          readHTMLFile(__dirname+'/../../public/mailTemplates/forgetPasswordMail.html', function(err, html) {
           
            var template = handlebars.compile(html);
              var replacements = {
                // username:req.body.firstName+" "+req.body.lastName
              };
              
              // var htmlToSend = template(replacements);
              var transporter = nodemailer.createTransport({
                host: host,
                port: port,
                secure: true, // use SSL
                auth: {
                  user: mailId,
                  pass: pwd
                }
              });
              
              var mailOptions = {
                from: mailId,
                to: req.body.email,
                subject: "forgetpassword",
                text:'test11',
                html : otp 
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log("error :"+error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            
              return res.send({status:true,message:"Email Send Successfully"});
          });
        }); 

} catch (error) {
  
}
      
        
     });
};

exports.newpassword = (req,res) => {
    db.models.user.findOne({"email":req.body.email},function(err,userData){
        if(err){
           return res.status(500).send({status:false,message:err.message});
        }
        if(!userData){
           return res.status(404).send({status:false,message:"Email is not found matching"});
        }
        let newpassword = md5(req.body.newpassword);
        let comfirmpassword = md5(req.body.comfirmpassword);
        req.body.newpassword = newpassword; 
        req.body.comfirmpassword = comfirmpassword; 
        if(newpassword != comfirmpassword){
            return res.status(406).send({status:false,message:"Newpassword and Comfirmpassword is not Matching "});
        }
        db.models.user.updateOne({email:req.body.email},{$set:{password:newpassword}},(err,data)=>{
          if(err){return res.status(500).send({status: false,message: err.message});}
          db.models.user.findOne({email:req.body.email},(err,data)=>{
              if(err){return res.status(500).send({status:false, message: err.message});}
              return res.status(201).send({status: true,message: "Password Reset Successfully",data: data});
          })
      }); 
  });
};

exports.verifyOTPmail = (req,res) => {
    let email = req.body.email;
  db.models.user.findOne({"email":email,"otp":req.body.otp},function(err,userData){
    if(err){
       return res.send({status:false,message:err.message});
    }
    if(!userData){
       return res.send({status:false,message:"Wrong OTP"});
    }
      return res.send({status:true,message:"OTP verified"});
  })
};


exports.resendMailOTP = (req,res) => {
              const newmailotp = auth.generateOTP();
              let email = req.headers.email;
              db.models.user.findOneAndUpdate({email:req.headers.email},{$set:{mailotp:newmailotp}},{new:true},(err,data)=>{
                if(err){return res.status(500).send({status: false,message: error.somethingWrong});}
            
            // readHTMLFile(__dirname+'/../../public/mailTemplates/otpsending.html', function(err, html) {
            //       var template = handlebars.compile(html);
            //       var replacements = {
            //         // username:req.body.firstName+" "+req.body.lastName,
            //         OTP:newmailotp
            //       };
            //       var htmlToSend = template(replacements);
            //       var transporter = nodemailer.createTransport({
            //         host: 'smtp.gmail.com',
            //         port: 465,
            //         secure: true, // use SSL
            //         auth: {
            //           user: mailId,
            //           pass: pwd
            //         }
            //       });
                  
            //       var mailOptions = {
            //         from: mailId,
            //         to: email,
            //         subject: 'OTP Verification',
            //         text:'test11',
            //         html : htmlToSend
            //       };
                  
            //       transporter.sendMail(mailOptions, function(error, info){
            //         if (error) {
            //           console.log("error :"+error);
            //         } else {
            //           console.log('Email sent: ' + info.response);
            //         }
            //       });
                 
  
                  return res.status(202).send({status: true,message:"OTP Updated ",data: data});
                });
  
              // });
        };


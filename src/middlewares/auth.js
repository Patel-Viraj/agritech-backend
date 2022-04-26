const jwt = require("jsonwebtoken");
const fast2sms = require("fast-two-sms");
const SendOtp = require('sendotp');
const sendOtp = new SendOtp('AuthKey');

const TOKEN_KEY =  "top-secret-key";
const Vonage = require('@vonage/server-sdk');
NEXMO_API_KEY =0;
NEXMO_API_SECRET=0;
const vonage = new Vonage({
  apiKey: NEXMO_API_KEY,
  apiSecret: NEXMO_API_SECRET
})

exports.verifyToken = async(req, res, next) => {
    const token =req.headers["Authorization"] || req.headers["authorization"] || req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token,TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

exports.generateToken = (userId) => {
    const token=jwt.sign({ user_id: userId},"top-secret-key",{expiresIn: "48h"});
    return token
  }

exports.generateOTP = () => {
    // Declare a digits variable 
    // which stores all digits
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    console.log( OTP); 
    return OTP;
    } 




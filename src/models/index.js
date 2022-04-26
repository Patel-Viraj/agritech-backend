require('dotenv').config();
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var fs = require('fs');
var path = require('path');
var basename = path.basename(module.filename);
const  str = process.env.MONGO_URL;
try {
    // Connect to the MongoDB cluster
     mongoose.connect(
      str,
      {useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true},
      () => 
      console.log(" Mongoose is connected")
    );

  } catch (e) {
    console.log("could not connect");
  }


  fs.readdirSync(__dirname).filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  }).forEach(function (file) {
      mongoose.model(path.parse(file).name, require(path.join(__dirname, file))(mongoose));
  });

  module.exports = mongoose;
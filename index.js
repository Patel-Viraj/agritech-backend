global.db = require('./src/models');
global.__basedir = __dirname;
require('dotenv').config();
const path = require("path");
const express = require("express");
const app = express();
var http = require('http').Server(app);

var cors = require('cors');
var bodyParser = require('body-parser');
const auth = require("./src/middlewares/auth");
const userRouter = require("./src/routes/user");
const commonRouter = require("./src/routes/commonRoutes");
const masterTablerRoutes = require("./src/routes/masterTableRoutes");

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(express.static(__dirname + 'public')); //Serves resources from public folder
const PORT = process.env.PORT;
app.use("/api/user",userRouter);
app.use("/api/masterTable",masterTablerRoutes);
app.use("/api",commonRouter);


http.listen(PORT, (req, res) => {
    console.log(`app is listening to PORT ${PORT}`)
});
global.db = require('./src/models');
global.__basedir = __dirname;
require('dotenv').config();
const path = require("path");
const express = require("express");
const app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
      origins: ['http://localhost:3000']
    }
  });
var cors = require('cors');
var bodyParser = require('body-parser');
const auth = require("./src/middlewares/auth");
const userRouter = require("./src/routes/user");
const commonRouter = require("./src/routes/commonRoutes");
const masterTablerRoutes = require("./src/routes/masterTableRoutes");
const swaggerUi = require('swagger-ui-express'),swaggerDocument = require('./swagger.json');

app.use(cors());
app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(express.static(__dirname + 'public')); //Serves resources from public folder
const PORT = process.env.PORT;
app.use('/api-docs',swaggerUi.serve,  swaggerUi.setup(swaggerDocument));
app.use("/api/user",userRouter);
app.use("/api/masterTable",masterTablerRoutes);
app.use("/api",commonRouter);




io.on('connection', (socket) => {
    console.log('a user connected');  
    // socket.on('disconnect', () => {
    //   console.log('user disconnected');
    // });
    socket.on('message', (msg) => {
      console.log(msg);
      socket.broadcast.emit('message-broadcast',msg);
    });
  });
  
  // io.on('connection', (socket) => {
  //   let token = socket.handshake.auth.token;
  //   socket.on('my message', (msg) => {
  //     io.emit('my broadcast', 'server:' +  JSON.stringify(msg));
  //   });
  // });


http.listen((PORT, err ) => {
       if (err)return console.error(err);
    console.log(`app is listening to PORT ${PORT}`)
});
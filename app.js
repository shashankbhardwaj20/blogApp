//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const {connectToMongoDB} = require("./connection/connection");
const homeRouter = require("./staticRoutes/staticRoutes");
const postRouter = require("./routes/posts");
const userRouter = require("./routes/users");
const manageAcess = require("./middlewares/manageAcess");
const cookieParser = require("cookie-parser");
const path =  require('path');
require('dotenv').config();

const url = process.env.URL;
connectToMongoDB(url);


const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/",manageAcess,homeRouter);
app.use("/posts",postRouter); 
app.use("/users",userRouter);


const port  = process.env.PORT;
app.listen(port, function() {
  console.log(`Server started on port ${port}!`);
});




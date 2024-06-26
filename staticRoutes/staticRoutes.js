const express = require("express");
const {Post} = require("../models/post");
const unverifiedUser = require("../models/unverifiedUser");
const {checkIsLogged}  =  require("../utils/loginUtils");
const {getUserName}  =  require("../utils/userUtils");
const {handelUserRegister} = require("../controllers/userController")
const Router = express();



Router.get("/",function(req,res){
    Post.find(function(err,posts){
      if(!err){
        const loginStatus = checkIsLogged();
        const userName = getUserName();
        res.render("../views/home",{allPosts:posts,isLoggedIn:loginStatus,userName:userName});
      }
    });
});

Router.get("/about",function(req,res){
  const loginStatus = checkIsLogged();
  const userName = getUserName();
  res.render("../views/about",{isLoggedIn:loginStatus,userName:userName});
});

Router.get("/otp",function(req,res){
  const loginStatus = checkIsLogged();
  const userName = getUserName();
  res.render("../views/otp",{isLoggedIn:loginStatus,userName:userName});
});

Router.post("/handelVerifyOtp", async function(req,res){
  const providedEmail = req.body.email;
  const providedOtp = req.body.otp;
  const userFound = await unverifiedUser.findOne({email:providedEmail,otp:providedOtp});
  if(!userFound){
    res.redirect("/users/register");
  }
  else{
    handelUserRegister(req,res,userFound);
  }
});



module.exports = Router;
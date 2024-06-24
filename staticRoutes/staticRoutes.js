const express = require("express");
const {Post} = require("../models/post");
const {checkIsLogged}  =  require("../utils/loginUtils");
const {getUserName}  =  require("../utils/userUtils");
const Router = express();



Router.get("/",function(req,res){
    Post.find(function(err,posts){
      if(!err){
        const loginStatus = checkIsLogged();
        const userName = getUserName();
        res.render("home",{allPosts:posts,isLoggedIn:loginStatus,userName:userName});
      }
    });
});

Router.get("/about",function(req,res){
  const loginStatus = checkIsLogged();
  const userName = getUserName();
  res.render("about",{isLoggedIn:loginStatus,userName:userName});
});

Router.get("/contact",function(req,res){
  const loginStatus = checkIsLogged();
  const userName = getUserName();
  res.render("contact",{isLoggedIn:loginStatus,userName:userName});
});

Router.get("/subscibeToPremium",function(req,res){
  const loginStatus = checkIsLogged();
  const userName = getUserName();
  res.render("../views/subscriptionPage",{isLoggedIn:loginStatus,userName:userName});
});

module.exports = Router;
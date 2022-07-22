//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");
// const res = require("express/lib/response");
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin-shashank:shashank123@cluster0.pcdnrmx.mongodb.net/blogDB');
//  mongoose.connect('mongodb://localhost:27017/blogDB');

const Post = mongoose.model('post', { postTitle : String, postContent : String ,username : String,postDate : String});
const User = mongoose.model('user',{
  userName : String,
  email : String,
  password : String
});

const date = new Date();
options={
  weekday:"long",
  day:"numeric",
  month:"long",
  year:"numeric",
  time:'long'
}
var currentDay = date.toLocaleDateString("en-US",options);

let userName='';
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


let isLoggedIn=false;
app.get("/",function(req,res){
  Post.find(function(err,posts){
    if(!err){
      res.render("home",{content:homeStartingContent , allPosts:posts,isLoggedIn:isLoggedIn,userName:userName});
    }
  });
});
app.get("/about",function(req,res){
  res.render("about",{content:aboutContent,isLoggedIn:isLoggedIn,userName:userName});
});
app.get("/contact",function(req,res){
  res.render("contact",{content:contactContent,isLoggedIn:isLoggedIn,userName:userName});
});
app.get("/compose",function(req,res){
  res.render("compose",{isLoggedIn:isLoggedIn,userName:userName});
});
// app.get("/post",function(req,res){
//   res.render("post",{postTitle:posts[index].postTitle,postContent:posts[index].postContent});
// });

app.post("/compose",function(req,res){
  const newPost = new Post({
    postTitle:req.body.postTitle,
    postContent:req.body.postContent,
    username:userName,
    postDate:currentDay,
  });
  newPost.save();
  res.redirect("/");
});
// LOGIN GET POST REQUESTS
app.get("/login",function(req,res){
  res.render("login",{isLoggedIn:isLoggedIn,userName:userName});
});
//shanky2000sharma@gmail.com Shasshank
app.post("/login",function(req,res){
  const emailEntererd=req.body.email;
  const passwordEntererd=req.body.password;
  User.findOne({email:emailEntererd},function(err,userFound){
    if(!err){
      const actualPassword=userFound.password;
      if(actualPassword===passwordEntererd) {
        userName=userFound.userName;
        isLoggedIn=true;
        res.redirect("/");
      }
      else{
        res.redirect("/login");
      }
    }
    else {
      res.redirect("/login");
    }
  });
});

// REGISTER GET POST REQUESTS
app.get("/register",function(req,res){
  res.render("register",{isLoggedIn:isLoggedIn,userName:userName});
});

app.post("/register",function(req,res){
  isLoggedIn=true;
  userName=req.body.username;
  emailEntererd=req.body.email;
  User.findOne({email:emailEntererd},function(err,userFound){
      if(!userFound){
          const newUser = new User({
            userName:req.body.username,
            email:req.body.email,
            password:req.body.password,
          });
          newUser.save();
      }else{
        res.redirect('/')
      }
  });
});

// GET REQUEST FOR LOGOUT
app.get('/logout',function(req,res){
  isLoggedIn=false;
  res.redirect('/');
});


app.get("/post/:postID",function(req,res){  
  
  Post.findById(req.params.postID,function(err,postFound){
    if(!err) res.render("post",
    {postTitle:postFound.postTitle,
      postContent:postFound.postContent,
      postDate:postFound.postDate,
      authorName:postFound.username,
      isLoggedIn:isLoggedIn,
      userName:userName
    }
    );
    else console.log(err);
  });
});


//  POST REQUEST FOR DELETE 
app.post('/delete',function(req,res){
  
  if(!isLoggedIn) res.redirect('/login');
  else if(isLoggedIn && (userName!=req.body.postAuthor)) res.redirect('/');
  else {
    Post.deleteOne({postTitle:req.body.post},function(err){
        if(!err){
          console.log('post deleted successfully');
          res.redirect('/');
        }else console.log(err);
      });
  }
});

//  POST REQUEST FOR EDIT
app.post('/edit',function(req,res){
  if(!isLoggedIn) res.redirect('/login');
  else if(isLoggedIn && (userName!=req.body.postAuthor)) res.redirect('/');
  else {
    Post.findOne({postTitle:req.body.post},function(err,postFound){
        if(postFound){
          Post.deleteOne({postTitle:postFound.postTitle},function(err){
            if(!err){
              console.log('post deleted successfully');
            }else console.log(err);
          });
          res.render('edit',{isLoggedIn:isLoggedIn,userName:userName});
        }else console.log(err);
      });
  }
});





app.listen(process.env.PORT||3000, function() {
  console.log("Server started on port 3000!");
});

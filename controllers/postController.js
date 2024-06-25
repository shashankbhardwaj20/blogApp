const {Post} = require("../models/post");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const {checkIsLogged,setLogin,unsetLogin}  =  require("../utils/loginUtils");
const {getUserName,setUserName}  =  require("../utils/userUtils");
const currentDay = require("../utils/currentDay");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
require('dotenv').config();


function composePost(req,res){
    const loginStatus = checkIsLogged();
    const userName = getUserName();
    res.render("../views/compose",{isLoggedIn:loginStatus,userName:userName});
}
function handelCreatePostRequest(req,res){
    const userName = getUserName();
    const newPost = new Post({
      postTitle:req.body.postTitle,
      postContent:req.body.postContent,
      username:userName,
      postDate:currentDay,
    });
    newPost.save();
    res.redirect("/");
}

function handelEditPostRequest(req,res){
  const userName = getUserName();
  const loginStatus = checkIsLogged();
  if(!loginStatus) res.redirect('/login');
  else if(loginStatus && (userName!=req.body.postAuthor)) res.redirect('/');
  else {
    Post.findOne({postTitle:req.body.post},function(err,postFound){
        if(postFound){
          Post.deleteOne({postTitle:postFound.postTitle},function(err){
            if(!err){
              console.log('post deleted successfully');
            }else console.log(err);
          });
          res.render("../views/edit",{isLoggedIn:loginStatus,userName:userName});
        }else console.log(err);
    });
  }
}

function handelDeletePostRequest(req,res){
  const loginStatus = checkIsLogged();
  const userName = getUserName();
  if(!loginStatus) res.redirect('/login');
  else if(loginStatus && (userName!=req.body.postAuthor)) res.redirect('/');
  else {
    Post.deleteOne({postTitle:req.body.post},function(err){
        if(!err){
          console.log('post deleted successfully');
          res.redirect('/');
        }else console.log(err);
      });
  }
};

function handelSeeFullPostRequest(req,res){  
  
  const loginStatus = checkIsLogged();
  const userName = getUserName();

  const objId = "" + req.params.id;
  const postID = new ObjectId(objId);
  Post.findOne({_id:postID},function(err,postFound){
    if(postFound) {res.render("../views/post",
    {postTitle:postFound.postTitle,
      postContent:postFound.postContent,
      postDate:postFound.postDate,
      authorName:postFound.username,
      isLoggedIn:loginStatus,
      userName:userName,
    }
    );}
    else console.log(err);
  });
};

function handelUserAIGetRequest (req,res){
  const loginStatus = checkIsLogged();
  const userName = getUserName();
  if(loginStatus) res.render("../views/composeP",{isLoggedIn:loginStatus,userName:userName});
  else res.redirect("/users/login");
}

async function handelUserAIPostRequest(req,res){
  userPrompt = req.body.postContent;
  
  const key = process.env.key;
  const genAI = new GoogleGenerativeAI(key);

  async function run() {
    try {
        // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(userPrompt);
        const response = await result.response;
        const text = await response.text(); 
        const loginStatus = checkIsLogged();
        const userName = getUserName();
        res.render("GenText", {
            isLoggedIn: req.isLoggedIn, 
            userName: req.userName,    
            text: text,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: error });
    }
}

  await run();
};

module.exports = {
  composePost,
  handelCreatePostRequest,
  handelEditPostRequest,
  handelDeletePostRequest,
  handelSeeFullPostRequest,
  handelUserAIGetRequest,
  handelUserAIPostRequest
};

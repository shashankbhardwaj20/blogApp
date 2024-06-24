const mongoose = require("mongoose");


const Post = mongoose.model(
    'post', 
    { 
        postTitle : String, 
        postContent : String ,
        username : String,
        postDate : String
    }
);

module.exports = {Post}


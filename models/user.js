const mongoose = require("mongoose");


const User = mongoose.model('user',{
    userName : String,
    email : String,
    password : String
  });

  
module.exports = User;
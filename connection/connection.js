const mongoose = require('mongoose');

function connectToMongoDB(url){
    mongoose.connect('mongodb+srv://admin-shashank:shashank123@cluster0.pcdnrmx.mongodb.net/blogDB');
}


module.exports = {connectToMongoDB}


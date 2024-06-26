const mongoose = require('mongoose');

function connectToMongoDB(url){
    mongoose.set('strictQuery', true);
    // mongoose.connect("mongodb://127.0.0.1:27017/codex");
    mongoose.connect(url);
}


module.exports = {connectToMongoDB}


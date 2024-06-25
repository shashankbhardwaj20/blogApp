const mongoose = require('mongoose');

function connectToMongoDB(url){
    mongoose.set('strictQuery', true);
    mongoose.connect(url);
    
}


module.exports = {connectToMongoDB}


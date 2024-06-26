const mongoose = require('mongoose');

const unverifiedUserSchema = new mongoose.Schema({
    userName : {
        type : String,
        unique : true,
        required : true
    } ,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '30' // Document will automatically be removed after 10 minutes
    }
});

const UnverifiedUser = mongoose.model('UnverifiedUser', unverifiedUserSchema);

module.exports = UnverifiedUser;

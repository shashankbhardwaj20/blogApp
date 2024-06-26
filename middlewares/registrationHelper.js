const User = require("../models/user");
const UnverifiedUser = require("../models/unverifiedUser");
const {setLogin}  =  require("../utils/loginUtils");
const {setUserName}  =  require("../utils/userUtils");
const {setUser} = require("../utils/auth");
const {hashPassword,comparePasswords} =  require("../utils/manageHashing");
const {sendOtpEmail} = require("../utils/email");
const {passwordValidation} = require("../utils/passwordValidation");

async function registrationHelper(req,res){
    const enteredUserName = req.body.username;
    const enteredUserEmail =  req.body.email;
    const enteredPassword = req.body.password;
    if(!passwordValidation(enteredPassword)){
        res.redirect("/users/register");
    }
    else{
        const userFound = await User.findOne({email:enteredUserEmail});
        if(userFound){
            const comparisonResult = await comparePasswords(enteredPassword,userFound.password)
            if(comparisonResult===true){
                setLogin();
                setUserName(enteredUserName);
                signedToken = setUser(userFound);
                res.cookie("uid",signedToken);
                res.redirect('/');
            }
            else{
                res.redirect("/users/register");
            }
        }
        else{
            const hashedPassword = await hashPassword(req.body.password);
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const newUnverifiedUser = new UnverifiedUser({
            userName: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            otp: otp
            });
            await newUnverifiedUser.save();

            await sendOtpEmail(req.body.email, otp);
            res.redirect("/otp");   
        }
    }
}

module.exports = {registrationHelper};
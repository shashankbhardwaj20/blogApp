const User = require("../models/user");
const UnverifiedUser = require("../models/unverifiedUser");
const {checkIsLogged,setLogin,unsetLogin}  =  require("../utils/loginUtils");
const {getUserName,setUserName,unsetUserName}  =  require("../utils/userUtils");
const {getUser,setUser} = require("../utils/auth");
const {comparePasswords} =  require("../utils/manageHashing");
function userLoginPage(req, res) {
  const uid = req.cookies ? req.cookies.uid : undefined;
  let userFound = undefined;
  if (uid) {
    userFound = getUser(uid);
  }
  if (!uid || !userFound) {
    const loginStatus = checkIsLogged();
    const userName = getUserName();
    res.render("../views/login", { isLoggedIn: loginStatus, userName: userName });
  } else {
    setUserName(userFound.userName);
    setLogin();
    res.redirect("/");
  }
}

function handelUserLogin(req, res) {
  const emailEntered = req.body.email;
  const passwordEntered = req.body.password;
  User.findOne({email: emailEntered}, function(err, userFound) {
    if (!err && userFound) {
      if (userFound) {
        if(!(comparePasswords(passwordEntered,userFound.password))){
          res.redirect("/users/login");
        }
        else{
          console.log('Login successful');
          setUserName(userFound.userName);
          setLogin();
          const signedToken = setUser(userFound);
          res.cookie("uid", signedToken,{maxAge: 86400000});
          res.redirect("/");
        }
      } else {
        console.log('Login failed');
        res.redirect("/users/login");
      } 
      
    } else {
      res.redirect("/users/login");
    }
  });
}


function handelUserLogout(req,res){
  unsetLogin();
  unsetUserName();
  res.clearCookie('uid');
  res.redirect('/');
};

function userRegisterPage(req,res){
    const uid = req.cookies ? req.cookies.uid : undefined;
    let userFound = undefined;
    if (uid) {
      userFound = getUser(uid);
    }
    if(!userFound){
      const loginStatus = checkIsLogged();
      const userName = getUserName();
      res.render("../views/register",{isLoggedIn:loginStatus,userName:userName});
    }
    else {
      setUserName(userFound.userName);
      setLogin();
      res.redirect("/");
    }
};


async function handelUserRegister(req,res,user){
  try{
    const providedusername = user.userName;
    const providedEmail = user.email;
    const providedPassword = user.password;
    setLogin();
    setUserName(providedusername);
    const newUser = new User({
      userName : providedusername,
      email : providedEmail,
      password : providedPassword
    })
    await newUser.save();
    await UnverifiedUser.deleteOne({email:providedEmail});
    const signedToken = setUser(newUser);
    res.cookie("uid",signedToken);
    res.redirect('/');
  }
  catch (err) {
    console.error('Error handling user registration:', err);
    res.status(500).redirect("/users/register");
  }
};
module.exports = {userLoginPage,handelUserLogin,handelUserLogout,userRegisterPage,handelUserRegister};
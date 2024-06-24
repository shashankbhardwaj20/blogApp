const User = require("../models/user");
const {checkIsLogged,setLogin,unsetLogin}  =  require("../utils/loginUtils");
const {getUserName,setUserName,unsetUserName}  =  require("../utils/userUtils");
const {getUser,setUser} = require("../utils/auth");


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
  User.findOne({ email: emailEntered, password: passwordEntered }, function(err, userFound) {
      if (!err && userFound) {
          setUserName(userFound.userName);
          setLogin();
          const signedToken = setUser(userFound);
          // Setting the cookie with appropriate options
          res.cookie("uid", signedToken,{maxAge: 86400000});
          res.redirect("/");
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

function handelUserRegister(req,res){
    setLogin();
    setUserName(req.body.username);
    emailEntererd=req.body.email;
    let signedToken = '';
    User.findOne({email:emailEntererd},function(err,userFound){
        if(!userFound){
            const newUser = new User({
              userName:req.body.username,
              email:req.body.email,
              password:req.body.password,
            });
            newUser.save();
            signedToken = setUser(newUser);
        }
        else{
            signedToken = setUser(userFound);
        }
        res.cookie("uid",signedToken);
        res.redirect('/');
    });
};
module.exports = {userLoginPage,handelUserLogin,handelUserLogout,userRegisterPage,handelUserRegister};
const {checkIsLogged,setLogin,unsetLogin}  =  require("../utils/loginUtils");
const {getUserName,setUserName,unsetUserName}  =  require("../utils/userUtils");
const {getUser,setUser} = require("../utils/auth");

const has_premium=false;
function manageAcess(req,res,next){
  const uid = req.cookies ? req.cookies.uid : undefined;
  let userFound = undefined;
  if (uid) {
    userFound = getUser(uid);
  }
  if (!uid || !userFound) {
    unsetUserName();
    unsetLogin();
    next();
  } else {
    setUserName(userFound.userName);
    setLogin();
    next();
  }
}

module.exports = manageAcess;
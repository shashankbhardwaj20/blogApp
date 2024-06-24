const express = require("express");
const {userLoginPage,handelUserLogin,handelUserLogout,userRegisterPage,handelUserRegister} = require("../controllers/userController");
const Router = express();


Router.get("/login",userLoginPage);
Router.post("/login",handelUserLogin);
Router.get("/logout",handelUserLogout);
Router.get("/register",userRegisterPage);
Router.post("/register",handelUserRegister);
module.exports = Router;


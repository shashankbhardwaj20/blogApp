const express = require("express");
const {userLoginPage,handelUserLogin,handelUserLogout,userRegisterPage,handelUserRegister} = require("../controllers/userController");
const {registrationHelper} = require("../middlewares/registrationHelper");
const Router = express();


Router.get("/login",userLoginPage);
Router.post("/login",handelUserLogin);
Router.get("/logout",handelUserLogout);
Router.get("/register",userRegisterPage);
Router.post("/register",registrationHelper);
module.exports = Router;


const express = require("express");
const Controller = require("../Controller/controller");
const routes = express.Router();

routes.get("/", Controller.localHost);
routes.get("/profile", Controller.profilePage);
routes.get("/signUp", Controller.signUpPage);
routes.post("/signUpData", Controller.signUpPageData);
routes.get("/signIn", Controller.signInPage);
routes.post("/signInData", Controller.signInPageData);

module.exports = routes;

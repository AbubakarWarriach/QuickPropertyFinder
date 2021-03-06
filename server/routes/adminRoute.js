const app = require('express');
const route = app.Router();
const auth = require('../utils/auth');
const {fetchVerifyUsers, fetchUnVerifyUsers, verifyUser, unVerifyUser} = require("../controlers/adminControler");
// fetch property dealers details....
route.get("/verify_dealers/:page", fetchVerifyUsers);
route.get("/unverify_dealers", fetchUnVerifyUsers);
route.post("/verifyPropertyDealer", verifyUser);
route.post("/unVerifyPropertyDealer", unVerifyUser);
module.exports = route;
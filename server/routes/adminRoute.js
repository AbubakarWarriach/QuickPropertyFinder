const app = require('express');
const route = app.Router();
const auth = require('../utils/auth');
const {fetchVerifyUsers, fetchUnVerifyUsers, verifyUser} = require("../controlers/adminControler");
// fetch property dealers details....
route.get("/verify_dealers/:page", fetchVerifyUsers);
route.get("/unverify_dealers", fetchUnVerifyUsers);
route.post("verifyPropertyDealer", verifyUser);
module.exports = route;
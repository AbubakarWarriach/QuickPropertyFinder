const app = require('express');
const route = app.Router();
const auth = require('../utils/auth');
const {fetchVerifyUsers, fetchUnVerifyUsers} = require("../controlers/adminControler");
// fetch property dealers details....
route.get("/verify_dealers/:page", fetchVerifyUsers);
route.get("/unverify_dealers/:page", fetchUnVerifyUsers);
module.exports = route;
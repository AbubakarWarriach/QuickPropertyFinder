const app = require('express');
const route = app.Router();
const {customerRegister, customerLogin} = require('../controlers/customerControler');
route.post("/customerSignup", customerRegister);
route.post("/customerSignin", customerLogin);

module.exports = route;
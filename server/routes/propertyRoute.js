const app = require('express');
const route = app.Router();
const { addProperty, fetchProperties, fetchProperty } = require('../controlers/propertyControler');
const auth = require('../utils/auth');
route.post('/add_property',auth, addProperty);
route.get("/fetch_properties/:id/:page",auth, fetchProperties);
route.get("/fetch_property/:id", fetchProperty);
module.exports = route;
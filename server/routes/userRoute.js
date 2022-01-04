const app = require('express');
const route = app.Router();
const {registration, login, editProfile, updateProfilePhoto} = require('../controlers/userControler');
const auth = require('../utils/auth');
route.post('/user_register', registration);
route.post("/login", login);
route.post("/edit_profile", auth, editProfile);
route.post("/update_profile_photo", auth, updateProfilePhoto);
module.exports = route;
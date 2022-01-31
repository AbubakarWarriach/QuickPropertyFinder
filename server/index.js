const express = require("express");
const app = express();
require('dotenv').config();
require('./config/db');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoute');
const popertyRoutes = require('./routes/propertyRoute');
const adminRoute = require('./routes/adminRoute');
const customerRoute = require('./routes/customerRoute');
app.use(bodyParser.json());
app.use('/', userRoutes);
app.use('/', popertyRoutes);
app.use('/', adminRoute);
app.use('/', customerRoute);
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("server is runing");
});
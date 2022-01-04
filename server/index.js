const express = require("express");
const app = express();
require('dotenv').config();
require('./config/db');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoute');
const popertyRoutes = require('./routes/propertyRoute');
app.use(bodyParser.json());
app.use('/', userRoutes);
app.use('/', popertyRoutes);
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("server is runing");
});
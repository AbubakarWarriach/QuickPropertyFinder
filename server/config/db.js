const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
    //useCreateIndex: true
}).then(()=>{
    console.log("connection successfull");
}).catch((err)=>{
    console.log("Error", err);
});
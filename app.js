const express=require('express');
const connectToDb = require('./config/dbConfig.js');
require("dotenv").config();
const router= require("./routes/userRoutes.js")
const app=express();

connectToDb();

app.use(express.json());
app.use('/',router);
module.exports=app;
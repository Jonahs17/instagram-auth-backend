const express=require('express');
const connectToDb = require('./config/dbConfig.js');
require("dotenv").config();
const router= require("./routes/userRoutes.js");
const cookieParser=require("cookie-parser");

const app=express();

connectToDb();

app.use(cookieParser());
app.use(express.json());
app.use('/',router);
module.exports=app;
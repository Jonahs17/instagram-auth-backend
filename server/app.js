const express=require('express');
const connectToDb = require('./config/dbConfig.js');
require("dotenv").config();
const router= require("./routes/userRoutes.js");
const cookieParser=require("cookie-parser");
const bodyParser=require("body-parser");
const path = require('path');
const cors=require("cors");

const app=express();

connectToDb();

app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5500",
    credentials:true
}));
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.json());
app.use('/',router);
module.exports=app;
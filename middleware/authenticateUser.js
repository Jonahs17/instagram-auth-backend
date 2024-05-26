const emailValidator=require("email-validator");
const bcrypt=require("bcrypt");
const userModel = require("../models/userModel.js");

const authenticateUser= async (req,res,next)=>{
    const userInfo= userModel(req.body);
    const {username,email,password,bio,name}= req.body;
    const validEmail=emailValidator.validate(email);
    
        if(!username||!email||!password||!bio||!name){
            res.status(400).json({
                success:false,
                data:"All details are required"
            });
        }
        else if(!validEmail){
            res.status(400).json({
                success:false,
                data:"Not valid email"
            });
        }

        else{
            next();
        }

}

module.exports=authenticateUser;

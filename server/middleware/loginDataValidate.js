const emailValidator=require("email-validator");
const bcrypt=require("bcrypt");
const userModel=require("../models/userModel.js");

const loginDataValidate=async (req,res,next)=>{
    const {email,password}=req.body;
    const validEmail = emailValidator.validate(email);
    const user=await userModel.findOne({email}).select('+password');
    if(!email||!password){
        res.status(400).json({
            success:false,
            data:"All details are required"
        });
    }
    else if(!validEmail){
        res.status(400).json({
            success:false,
            data:"Invalid Email"
        });
    }
    else if(!user){
        res.status(400).json({
            success:false,
            data:"User does not exist"
        });
    }
    else if(!await (bcrypt.compare(password,user.password))){
        res.status(400).json({
            success:false,
            data:"password does not match"
        });
    }
    else{
        next();
    };
    

}

module.exports=loginDataValidate;
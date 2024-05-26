const userModel=require("../models/userModel.js");

exports.home=(req,res)=>{
    res.send("<h1>HOME PAGE</h1>");
};

exports.signup=async (req,res)=>{
    const userInfo= userModel(req.body);
    const {username,email,password,bio,name}= req.body;
    try{
        const result= await userInfo.save();
            res.status(200).json({
                success:true,
                data:result
            });
    }
    catch(e){
        if(e.code===11000){
            res.status(400).json({
                success:false,
                data:"Account already exists"
            });
        }
        res.status(400).json({
            success:false,
            data:e.message
        });
    };
};
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

exports.login=async (req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await userModel.findOne({email}).select("+password");

        const token = user.jwtToken();
        user.password=undefined;

        cookieOptions={
            maxAge:24*60*60*1000,
            httpOnly:true
        };

        res.cookie("token",token,cookieOptions);

        res.status(200).json({
            success:true,
            data:user
        }); 

    }
    catch(e){
        res.status(400).json({
            success:false,
            data:e.message
        });
    };
};

exports.getUser=async (req,res)=>{
    const userId=req.user.id;
        
    try{
        const user= await userModel.findById(userId);
        return res.status(200).json({
            success:true,
            user
        });
        
    }
    catch(e){
        res.status(400).json({
            success:false,
            data:e.message
        }); 
    }
}
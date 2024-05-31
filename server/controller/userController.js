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

        const token = await user.jwtToken();
        user.password=undefined;

        cookieOptions={
            maxAge:24*60*60*1000,
            httpOnly:true,
            sameSite: 'none'
        };

        res.cookie("token",token,cookieOptions);

        res.status(200).json({
            success:true,
            data:user
        }); 

        const token1= (req.cookies && req.cookies.token);
        console.log(token1);

    }
    catch(e){
        res.status(400).json({
            success:false,
            data:e.message
        });
    };
};

exports.getUser=async (req,res)=>{
    const {id,email} = req.user;

    try{
        const userData = await userModel.findOne({email});
        res.status(200).send({
            msg:"Success",
            data:userData
        })

    }
    catch(err){
        res.status(501).send({msg:err.message})
    }
}
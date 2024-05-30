const JWT=require('jsonwebtoken');

exports.authenticateUser=(req,res,next)=>{
    const token=(req.cookies && req.cookies.token) || null;

    if(!token){
        res.status(400).json({
            success:false,
            data:"Unauthorized access"
        });
    }

    try{
        const payload=JWT.verify(token,process.env.SECRET);
        req.user={id:payload.id,email:payload.email};
    }
    catch(e){
        res.status(400).json({
            success:false,
            data:e.message
        });
    }
    next();
}
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const JWT=require("jsonwebtoken");

const userSchema = mongoose.Schema({
    username:{
        type:String,
        maxLength:[30,"Max 30 chars"],
        minLength:[2,"Min 2 chars"],
        unique:[true,"username already in use"],
        trim:true
    },
    email:{
        type:String,
        maxLength:[30,"Max 30 chars"],
        minLength:[2,"Min 2 chars"],
        unique:[true,"email already in use"],
        trim:true
    },
    password:{
        type:String,
        maxLength:[30,"Max 30 chars"],
        minLength:[2,"Min 2 chars"],
        trim:true,
        select:false
    },
    bio:{
        type:String,
        maxLength:[100,"Max 100 chars"],
        minLength:[2,"Min 2 chars"], 
    },
    name:{
        type:String,
        maxLength:[30,"Max 30 chars"],
        minLength:[2,"Min 2 chars"],
        trim:true
    }
},{
    timestamps:true
});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next(); 
    }
    this.password= await bcrypt.hash(this.password,10);
});

userSchema.methods={
    jwtToken(){
        return JWT.sign(
            {id:this._id,email:this.email},
            process.env.SECRET,
            {expiresIn:'24h'}
        )
    }
}

const userModel=mongoose.model("User",userSchema);
module.exports=userModel;
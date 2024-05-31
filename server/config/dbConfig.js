const mongoose= require("mongoose");

const connectToDb= ()=>{
    mongoose
    .connect(process.env.MONGOURI)
    .then((conn)=>{
        console.log("Connected to DB: ",conn.connection.host);
    })
    .catch((e)=>{
        console.log(e.message);
        process.exit(1);
    });
}

module.exports=connectToDb;
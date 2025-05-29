const mongoose =require("mongoose");

 const connectDb=async()=>{
    try{
        const res=await mongoose.connect(process.env.MONGODB_URL);
        console.log("db connected successfully",res.connection.name);
        return res;
    }
    catch(error){
        throw new error("error in db connecting")
    }
}

module.exports=connectDb;
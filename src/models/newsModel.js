const {Schema}=require('mongoose');


const newsSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    decription:{
        type:String,
    },
    publishedAt:{
        type:Date,
        required:true,
    },
    likedBy:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

module.exports=mongoose.model("NewsSchema",newsSchema)

const mongoose = require("mongoose")
const { Schema } = require("mongoose");

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user",
    },
    blogId:{
        type:Schema.Types.ObjectId,
        ref:"blog",
    }
    
},
{timestamps:true}
)


module.exports=mongoose.model("comments",commentSchema)
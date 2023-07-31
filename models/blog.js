const mongoose = require("mongoose")
const { Schema } = require("mongoose");

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
        unique:true,
    },
    coverImageUrl:{
        type:String,
        required:false
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user",

    }
    
},
{timestamps:true}
)


module.exports=mongoose.model("blog",blogSchema)
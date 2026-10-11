const  mongoose=require("mongoose");
const templeteSchema=new mongoose.Schema({
    
name:{
    type:String,
    required:true,
    trim:true,
    maxlength:100,

},
description:{
    type:String,
    required:true,
    trim:true,
    maxlength:1000

},
thumbnail_url:{
    type:String,
    required:true,
    trim:true,
},
category:{
    type:String,
    required:true,
    trim:true,
    maxlength:50
}
},{timeStamps:true})
module.exports=mongoose.model("Templete",templeteSchema)
const templete=require("../Model/templeteModel")
const  mongoose=require("mongoose");


const escapeRegex = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const templeteListing=async(req,res)=>{
    try{
        const templetes=await templete.find().sort({createdAt:-1});
        return res.status(200).json({
            success:true,
           data: templetes

        })
    }
    catch(err){
        
        return res.status(500).json({success:false,message:err.message})
    }
}

const templeteBySearch=async(req,res)=>{
    try{
        const {search="",category=""}=req.query
        const filter={}
        if(search.trim()){
            const safeSearch=escapeRegex(search.trim());
            filter.$or=[
                {name:{$regex:safeSearch,$options:"i"}},
                {description:{$regex:safeSearch,$options:"i"}},

            ]
        }
        if(category.trim() &&  category!=="All"){
            filter.category=category.trim();
        }
        const templetes=await templete.find(filter).sort({createdAt:-1});
        return res.status(200).json({success:true,templetes})

    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}

const getTempleteById=async(req,res)=>{
    try{
        const {id}=req.params
        
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json({success:false,message:"Invalid templete Id"})
        };

        const templeteById=await templete.findById(id);
        if(!templeteById){
            return res.status(404).json({success:false,message:"Templete not found"})
        }

        return res.status(200).json({success:true,templeteById})

    }
    catch(err){
        return res.status(500).json({sucess:false,message:err.message})
    }
}
module.exports={templeteListing,templeteBySearch,getTempleteById }


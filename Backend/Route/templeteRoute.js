const express= require("express");
const router=express.Router();
const authMiddleware=require("../Middleware/authMiddleware")
const{templeteListing,getTempleteById, templeteBySearch}=require("../Controller/templeteController")

router.get("/list",authMiddleware,templeteListing)
router.get("/",authMiddleware,templeteBySearch)
router.get("/:id",authMiddleware,getTempleteById)

module.exports=router;

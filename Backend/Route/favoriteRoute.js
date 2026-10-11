const express=require("express");
const router=express.Router()
const {
  addFavorite,
  getFavorites,
  removeFavorite
} = require("../Controller/favoriteController");
const authMiddleware = require("../Middleware/authMiddleware");
const { favoriteLimiter} = require("../Middleware/rateLimitMiddleware");
router.post("/add/:id",authMiddleware,favoriteLimiter,addFavorite)
router.get("/",authMiddleware,getFavorites)
router.delete("/remove/:id", authMiddleware, removeFavorite);
module.exports=router;
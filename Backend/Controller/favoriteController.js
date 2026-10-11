
const mongoose = require("mongoose");
const User = require("../Model/userModel");
const Templete = require("../Model/templeteModel");

const addFavorite = async (req, res) => {
  try {
    const { id: templeteId } = req.params;
    const userId = req.user?.id;

    if (!userId || !mongoose.isValidObjectId(userId)) {
      return res.status(401).json({
        success: false,
        message: "Invalid or missing user ID",
      });
    }

    if (!mongoose.isValidObjectId(templeteId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid template ID",
      });
    }

    const templete = await Templete.findById(templeteId);

    if (!templete) {
      return res.status(404).json({
        success: false,
        message: "Template not found",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: templete._id } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Favorite added successfully",
      data: user.favorites,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getFavorites = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId || !mongoose.isValidObjectId(userId)) {
      return res.status(401).json({
        success: false,
        message: "Invalid or missing user ID",
      });
    }

    const user = await User.findById(userId).populate(
      "favorites",
      "name description thumbnail_url category"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user.favorites,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please log in",
      });
    }

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid template ID",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { favorites: id } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Removed from favorites successfully",
    }); 
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { addFavorite, getFavorites,removeFavorite };

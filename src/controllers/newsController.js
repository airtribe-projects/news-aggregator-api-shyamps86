const userModel = require("../models/userModel.js");
const {NewsService}=require("../services/index.js")
const ApiError = require("../utils/ApiError.js");





const getNews = (req,res) => {
   
   console.log("Fetching user news preferences for user ID:");
   const preferences=userModel.findById(req.user._id).select("preferences");
   if (!preferences) {
      throw new ApiError(404, "User preferences not found");
   }
   return res.status(200).json({
      status: "success",
      data: {
         news: preferences,
      }
   });
   
};




module.exports = { getNews };

const {NewsService}=require("../services/index.js")
const ApiError = require("../utils/ApiError.js");





const getNews = (req,res) => {
   const preferences=req.body;
   
};

const deleteNews = (id) => {
   
};


const patchNews = (id, data) => {
   
};


module.exports = { deleteNews, patchNews, getNews };

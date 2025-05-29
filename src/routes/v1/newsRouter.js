const router= require('express');

const {NewsController}=require("../../controllers/index.js")
const newsRouter=router();

// newsRouter.use("/news",NewsController.createNews)


module.exports=newsRouter;
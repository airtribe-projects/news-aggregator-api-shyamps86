const router= require('express');

const {NewsController}=require("../../controllers/index.js");
const verifyJwt = require('../../middlewares/authMiddleware.js');
const newsRouter=router();

newsRouter.get("/",verifyJwt, NewsController.getNews);


module.exports=newsRouter;
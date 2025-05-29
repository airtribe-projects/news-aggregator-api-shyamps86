const router= require('express');
const {UserController}=require("../../controllers/index.js");
const verifyJwt = require('../../middlewares/authMiddleware.js');
const userRouter=router();

userRouter.post("/register",UserController.createUser);
userRouter.post("/login",UserController.login);

userRouter.post("/logout",verifyJwt, UserController.logout);

userRouter.post("/preferences",verifyJwt, UserController.userPreferences);
userRouter.put("/preferences",verifyJwt, UserController.updateUserPreferences);


module.exports=userRouter;


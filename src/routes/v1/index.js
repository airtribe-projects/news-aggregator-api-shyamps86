const Router = require("express");
const newsRouter = require("./newsRouter.js");

const userRouter=require("./userRouter.js")

const v1Routes = Router();

v1Routes.use("/users", userRouter);
v1Routes.use("/news", newsRouter);

module.exports = v1Routes;


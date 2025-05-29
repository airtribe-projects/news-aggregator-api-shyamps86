const { StatusCodes } = require("http-status-codes");
const { UserService } = require("../services/index.js");

const createUser = async(req, res) => {
   try{
     const data=req.body;
    const user=await UserService.createUser(data);
    return res.status(StatusCodes.CREATED).json({
        user
    })
   }
   catch(error){
     return res.status(error.statusCode).json({
        message:error.explaination
     });
   }
};

const login = async(req, res) => {
    try{
        const data=req.body;
        const user=await UserService.login(data);
        const options = {
          httpOnly: true,
          secure: true,
        };
        const {refreshToken,accessToken}=user.tokens;
        delete user["tokens"];
        return res.status(StatusCodes.CREATED)
        .cookie("accessToken", accessToken)
        .cookie("refreshToken", refreshToken)
        .json({
            user: user
        })
      }
    catch(error){
        return res.status(error.statusCode).json({
            message:error.explaination
        });
   }
};

const logout = async(req, res) => {
  try{
    const id=req.user._id

        const user=await UserService.logout(id);
        const options = {
          httpOnly: true,
          secure: true,
        };
        return res.status(StatusCodes.OK)
        .json({
            user: user
        })
      }
    catch(error){
        console.log("error-->",error)
        return res.status(error.statusCode).json({
            message:error.explaination
        });
   }
};


const userPreferences = async(req,res) => {
   try{
    const id=req.user._id;
    const {data}=req.body;
    const user=await UserService.userPreferences(id,data);
    return res.status(StatusCodes.CREATED).json({
        user
    })
   }
   catch(error){
    console.log("error-->",error)
     return res.status(error.statusCode).json({
        message:error.explaination
     });
   }
};

const updateUserPreferences = async(req,res) => {
   try{
    const id=req.user._id;
    const {data}=req.body;
    const user=await UserService.updateUserPreferences(id,data);
    return res.status(StatusCodes.CREATED).json({
        user
    })
   }
   catch(error){
    console.log("error-->",error)
     return res.status(error.statusCode).json({
        message:error.explaination
     });
   }
};





module.exports = {
     login,
    logout,
    createUser,
    userPreferences,
    updateUserPreferences
}

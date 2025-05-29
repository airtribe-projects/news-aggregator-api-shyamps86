const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const generateTokens = require("../utils/tokensGenerate.js");
const CrudRespositary=require("./crudRepositary.js")

class UserRepositary extends CrudRespositary {
  constructor(model) {
    super(model);
    this.model=model;
  }
 async login({ password, userName, email }) {
    console.log("userName-->",userName,password,email);
    const isExistedUser = await  this.model.findOne({
      $or: [{ userName }, { email }],
    });
    if (!isExistedUser) {
      throw new ApiError("202", "user not registered");
    }
    const isPasswordMatched = isExistedUser.isPasswordCorrect(password);

    if (!isPasswordMatched) {
      throw new ApiError(402, "Invalid Password");
    }

    const tokens = await generateTokens(isExistedUser._id,this.model);

    const loggedInuser = await this.model.findById(isExistedUser._id).select(
      "-password -refreshToken"
    );

    return new ApiResponse(200, loggedInuser, "successfully created",tokens);  
 }


 async logout(id){
  const user = await this.model.findByIdAndUpdate(
    id,
    {
      $unset: {
        refreshToken: 1, 
      },
    },
    {
      new: true,
    }
  ).select("-updatedAt -createdAt -password -__v");
   
  return user;
  
  }

  async userPreferences(id, data) {
    const preferencesArray = Array.isArray(data) ? data : [data];
    const user = await this.model.findByIdAndUpdate(
        id,
        {
          $push: {
            preferences: { $each: preferencesArray },
          },
        },
        {
          new: true,
        }
      ).select("-updatedAt -createdAt -password -__v -refereshToken");
      
      return user;
    }


    async updateUserPreferences(id, data) {
      // const preferencesArray = Array.isArray(data) ? data : [data];
      const user = await this.model.findByIdAndUpdate(
          id,
          {
            $push: {
              preferences: { $each: data },
            },
          },
          {
            new: true,
          }
        ).select("-updatedAt -createdAt -password -__v -refereshToken");
        
        return user;
      }
  }



module.exports =  UserRepositary;
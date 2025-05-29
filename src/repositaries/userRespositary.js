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
   
  return new ApiResponse(200, user, "successfully logged out");
  
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
      ).select("-updatedAt -createdAt -password -__v -refreshToken");
      
      return new ApiResponse(200, user, "successfully preferences added");
    }


    async updateUserPreferences(id, data) {
      const user = await this.model.findByIdAndUpdate(
          id,
          {
            $set: {
              preferences: data,
            },
          },
          {
            new: true,
          }
        ).select("-updatedAt -createdAt -password -__v -refreshToken");
        
        return new ApiResponse(200, user, "successfully prefereces updated");
      }
      async getNews(id) {
        const user = await this.model.findById(
          id
        ).select("preferences -updatedAt -createdAt -password -__v -refreshToken");
        
        if (!user || !user.preferences || user.preferences.length === 0) {
          return new ApiResponse(200, [], "No preferences found for user");
        }

        const newsResults = await Promise.allSettled(
          user.preferences.map(async (preference) => {
            const response = await fetch(
              `https://newsapi.org/v2/everything?q=${preference}&apiKey=bb822841e09a42bca1e3317433c2b700`
            );
            const newsData = await response.json();
            return { preference, articles: newsData.articles || [] };
          })
        );

        return new ApiResponse(200, newsResults, "successfully fetched news");
      }

}


module.exports =  UserRepositary;
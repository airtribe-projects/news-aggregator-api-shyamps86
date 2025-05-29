const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");

class CrudRepositary {
    constructor(model) {
        this.model=model;
    }
    async register({ password, fullName, userName, email } ) {

         if (
            [fullName, userName, email, password].some((value) => value.trim() === "")
        ) {
            throw new ApiError(400, "all fields are mandatory");
        }
        
        const existedUser = await this.model.findOne({
            $or: [{ userName }, { email }]
        });
        if (existedUser) {
            throw new ApiError(403, "user already existed");
        }
        await this.model.create({
            userName,
            fullName,
            email,
            password
        });

        const createdUser = await this.model.findOne({ email }).select(
            "-password -refreshToken"
        );
        return new ApiResponse(200, createdUser, "successfully created");
    }
    delete(id) {
        //delete user or news
    }

   
}

module.exports = CrudRepositary;
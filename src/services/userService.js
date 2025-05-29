const {UserRepositary}  = require("../repositaries/index.js");
const ApiError = require("../utils/ApiError.js");
const userModel=require('../models/userModel.js');
const { StatusCodes } = require("http-status-codes");

const UserRespositary = new UserRepositary(userModel);



const createUser = async(data) => {
   try{
    const user=await UserRespositary.register(data);
      return user;
   }
   catch(error){
      throw error;
   }
};

const login = async(data) => {
   try{
    const user=await UserRespositary.login(data);
    return user;
   }
   catch(error){
     throw error;
   }
};

const logout = async(id) => {
   try{

    const user=await UserRespositary.logout(id);
    return user;
   }
   catch(error){
     throw error;
   }
};

const userPreferences = async(id,data) => {
   try{
    const user=await UserRespositary.userPreferences(id,data);
    return user;
   }
   catch(error){
     throw error;
   }
};

const updateUserPreferences = async(id, data) => {
   try{
    const user=await UserRespositary.updateUserPreferences(id,data);
    return user;
   }
   catch(error){
      console.log("error-->",error);
     throw error;
   }
};


module.exports = {createUser, logout,login, userPreferences,updateUserPreferences};

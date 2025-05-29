const userModel = require("../models/userModel.js");
const CrudRespositary=require("./crudRepositary.js")
class NewsRepositary extends CrudRespositary {
  constructor(model) {
    super(model);
  }
  async getNews({ id }) {
     
  
  }
}

module.exports =  NewsRepositary ;

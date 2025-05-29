class ApiResponse {
    constructor(statusCode,data,message="Success",tokens){
        this.statusCode=statusCode;
        this.data=data;
        this.message=message;  
        this.tokens=tokens
    }
}

module.exports= ApiResponse;
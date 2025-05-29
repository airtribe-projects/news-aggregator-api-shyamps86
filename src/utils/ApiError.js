class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.explaination = message;
    }
}

module.exports = ApiError;


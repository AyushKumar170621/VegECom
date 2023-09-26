const ErrorHandler = require("../utils/errorHandler");

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server error";
    //wrong mongo id error
    if(err.name ===  "CastError")
    {
        const message = `Resouce not found. Invalid ${err.path}`;
        err = new ErrorHandler(message,400);
    }

    //Mongoose duplicate key error 
    if(err.code === 11000)
    {
        const message = `Duplicate  ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message, 400);
    }
    if(err.name === "JsonWebTokenError")
    {
        const message = `Json Web Token is Invalid, Try again`;
        err = new ErrorHandler(message, 400);
    }
    if(err.name === "JsonWebTokenExpire")
    {
        const message = `Json Web Token is Expired, Try again`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        sucess:false,
        message:err.message
    });
}